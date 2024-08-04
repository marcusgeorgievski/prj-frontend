'use client';
import PageTitle from '@/components/page-title';
import { Input } from '@/components/ui/input';
import { PiBrainLight } from 'react-icons/pi';
import { JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import JSZip from 'jszip';
import { getAIResults } from '@/actions/ai';
import { AiOutlineLoading } from 'react-icons/ai';
import { createClass } from '@/actions/classes';
import { createAssessment } from '@/actions/assessments';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowUpRightIcon, Plus } from 'lucide-react';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
});

export default function AIPage() {
  const { userId } = useAuth();

  const [type, setType] = useState('file');

  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const MAX_TEXT_SIZE = 2000; // 200 word limit (5 pages single spaced)

  // Extract text
  async function extractTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new JSZip();
    const content = await zip.loadAsync(arrayBuffer);
    const doc = await content.file('word/document.xml').async('string');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(doc, 'application/xml');
    const texts = xmlDoc.getElementsByTagName('w:t');
    let textContent = '';

    for (let i = 0; i < texts.length; i++) {
      textContent += texts[i].textContent + ' ';
    }

    return textContent;
  }

  function handleFileChange(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    const selectedFile = e.target.files[0];
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size exceeds the 5MB limit');
      setFile(null);
      return;
    }
    setError(null);
    setFile(selectedFile);
  }

  function handleTextChange(e) {
    const value = e.target.value;
    if (value.length > MAX_TEXT_SIZE) {
      setError('Text content exceeds the 200 word limit');
      setText('');
      return;
    }
    setError(null);
    setText(value);
  }

  async function handleFileGeneration() {
    if (!file) {
      setError('Please upload a valid file');
      return;
    }

    try {
      let extractedText = '';

      if (file.type === 'application/pdf') {
        setError('PDFs not supported yet!');
      } else if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        extractedText = await extractTextFromDocx(file);
      } else {
        setError('Unsupported file type');
        return;
      }

      await fetchResults(extractedText);
    } catch (error) {
      setError('Failed to extract text from file', error);
      console.error(error);
    }
  }

  async function handleTextGeneration() {
    if (!text) {
      setError('Please paste valid text content');
      return;
    }
    if (text.length > MAX_TEXT_SIZE) {
      setError('Text content exceeds the 200 word limit');
      return;
    }

    await fetchResults(text);
  }

  async function fetchResults(content) {
    setIsLoading(true);
    try {
      const results = await getAIResults(content);
      console.log(results);
      setResult(results);
    } catch (error) {
      setError('Failed to generate AI results', error);
      console.error(error);
    }
    setIsLoading(false);
  }

  async function handleConfirm() {
    // Organize date
    const { name, professor } = result.class_info;
    const assessments = result.assessments;

    try {
      // Create class and get its id
      const classInfo = await createClass(userId, name, professor, null);

      console.log({ classInfo });

      // Create assignments and link them to the class id with `status: not started` and `due date: today`
      assessments.forEach(async (assessment) => {
        const payload = {
          userId: userId,
          classId: classInfo.class_id,
          name: assessment.name,
          status: 'Not Started',
          weight: assessment.weight,
          description: '',
          dueDate: new Date().toISOString(),
        };
        await createAssessment(userId, payload);
      });

      setIsCreated(true);
    } catch (err) {
      setError('Failed to create class and assignments', err);
      console.error(err);
    }
  }

  function handleReset() {
    setType('file');

    setFile(null);
    setText('');

    setIsCreated(false);
    setIsLoading(false);
    setError(null);
    setResult(null);
  }

  return (
    <div className="pb-16">
      <PageTitle icon={PiBrainLight} sub>
        AI Generation
      </PageTitle>

      <p className="text-slate-800 font-medium">
        Auto-generate a class and assignments with the power of AI.
      </p>

      <Button
        variant="outline"
        className="mt-6"
        onClick={handleReset}
        disabled={isLoading}
      >
        Reset
      </Button>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (1) Either Upload a DOCX file of your addendum{' '}
          <span className="underline">or</span> copy and paste its text
          content.
        </p>
        <div className="ml-9 mt-6">
          <div className="text-xs overflow-hidden w-fit text-slate-700 rounded border border-slate-300 mb-4 flex items-center justify-between">
            <button
              className={cn(
                'z-20 px-2 py-[2px]',
                type == 'file' && 'bg-slate-700 text-white'
              )}
              onClick={() => setType('file')}
              disabled={isLoading}
            >
              File
            </button>
            <button
              className={cn(
                'z-20 px-2 py-[2px]',
                type == 'text' && 'bg-slate-700 text-white'
              )}
              onClick={() => setType('text')}
              disabled={isLoading}
            >
              Text
            </button>
          </div>

          {type === 'file' ? (
            <div className="max-w-md flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                className="cursor-pointer"
                disabled={isLoading}
              />
              <Button
                className="px-10"
                onClick={handleFileGeneration}
                disabled={isLoading || !file}
              >
                Generate
              </Button>
            </div>
          ) : (
            <div>
              <textarea
                onChange={handleTextChange}
                value={text}
                placeholder="Paste text content here"
                className="w-full mb-2 border rounded resize-none p-2"
              />
              <Button
                className="px-10"
                onClick={handleTextGeneration}
                disabled={isLoading}
              >
                Generate
              </Button>
            </div>
          )}
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (2) Review extracted details
        </p>

        {isLoading && (
          <div className="flex items-center gap-2 justify-center my-12">
            <AiOutlineLoading className="animate-spin" />
            Loading{' '}
          </div>
        )}

        {result && (
          <div className="ml-9 mt-6">
            <div className="my-3">
              <p className="text-slate-700 text-xs">Class Name:</p>
              <p className="text-sm font-medium">
                {result.class_info.name}
              </p>
            </div>

            <div className="my-3">
              <p className="text-slate-700 text-xs">Professor:</p>
              <p className="text-sm font-medium">
                {result.class_info.professor}
              </p>
            </div>

            {result.assessments.map((assessment, index) => (
              <div key={index} className="my-3">
                <p className="text-slate-700 text-xs">
                  Assessment {index + 1}:
                </p>
                <p className="text-sm font-medium">
                  {assessment.weight}% - {assessment.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (3) Confirm
        </p>
        <div className="flex">
          <Button
            className="pr-6 pl-4 ml-9 mt-2"
            onClick={handleConfirm}
            disabled={isLoading || !result}
          >
            <Plus className="h-5 mr-2" />
            Confirm & Create
          </Button>

          {isCreated && (
            <Link
              href={`/classes/${result.class_info.class_id}`}
              className="flex items-center gap-2"
            >
              <Button className="pl-6 pr-3 ml-9 mt-2 " disabled={!result}>
                See new class
                <ArrowUpRightIcon className="h-5 ml-3 animate-bounce" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
