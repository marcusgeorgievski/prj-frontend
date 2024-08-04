'use client';
import PageTitle from '@/components/page-title';
import { Input } from '@/components/ui/input';
import { PiBrainLight } from 'react-icons/pi';
import { JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import JSZip from 'jszip';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
});

export default function AIPage() {
  const [type, setType] = useState('file');

  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const [error, setError] = useState(null);
  const [f, setF] = useState(null);

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
      setF(extractedText);
    } catch (error) {
      setError('Failed to extract text from file', error);
      console.error(error);
    }
  }

  function handleTextGeneration() {
    if (!text) {
      setError('Please paste valid text content');
      return;
    }
    if (text.length > MAX_TEXT_SIZE) {
      setError('Text content exceeds the 200 word limit');
      return;
    }

    // Handle here

    setF(text);
  }

  return (
    <div>
      <PageTitle icon={PiBrainLight} sub>
        AI Generation
      </PageTitle>

      <p className="text-slate-800 font-medium">
        Auto-generate a class and assignments with the power of AI.
      </p>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (1) Either Upload a DOCX file of your addendum{' '}
          <span className="underline">or</span> copy and paste its text
          content.
        </p>
        <div className="text-xs overflow-hidden w-fit text-slate-700 rounded border border-slate-300 mb-4 flex items-center justify-between">
          <button
            className={cn(
              'z-20 px-2 py-[2px]',
              type == 'file' && 'bg-slate-700 text-white'
            )}
            onClick={() => setType('file')}
          >
            File
          </button>
          <button
            className={cn(
              'z-20 px-2 py-[2px]',
              type == 'text' && 'bg-slate-700 text-white'
            )}
            onClick={() => setType('text')}
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
            />
            <Button className="px-10" onClick={handleFileGeneration}>
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
            <Button className="px-10" onClick={handleTextGeneration}>
              Generate
            </Button>
          </div>
        )}
        <p className="text-sm text-red-700 mt-1">{error}</p>
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (2) Review extracted details
        </p>

        <div>{f}</div>
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (3) Confirm
        </p>
        <Button className="px-10">Confirm</Button>
      </div>
    </div>
  );
}
