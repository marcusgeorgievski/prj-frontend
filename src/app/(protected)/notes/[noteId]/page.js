import { getClassById } from '@/actions/classes';
import { getNoteById } from '@/actions/notes';
import Editor from '@/components/notes/editor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NotePage({ params: { noteId } }) {
  let note = await getNoteById(noteId);
  const classname = await getClassById(note[0].class_id);

  note = {
    ...note[0],
    classname: classname[0].name,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/notes">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 mb-4 text-muted-foreground"
        >
          <ArrowLeft size={14} />
          All notes
        </Button>
      </Link>

      <Editor note={note} />
    </div>
  );
}
