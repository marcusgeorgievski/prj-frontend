import { getClassById } from '@/actions/classes';
import { getNoteById } from '@/actions/notes';
import Editor from '@/components/notes/editor';
import Loading from '../loading';
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
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 mb-4 text-muted-foreground"
      >
        <ArrowLeft size={14} />
        <Link href="/notes">All notes</Link>
      </Button>

      <Editor note={note} />
    </div>
  );
}
