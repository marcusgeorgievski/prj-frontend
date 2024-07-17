import { getClassById } from '@/actions/classes';
import { getNoteById } from '@/actions/notes';
import Editor from '@/components/notes/editor';
import Loading from '../loading';

export default async function NotePage({ params: { noteId } }) {
  let note = await getNoteById(noteId);
  const classname = await getClassById(note[0].class_id);

  note = {
    ...note[0],
    classname: classname[0].name,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Editor note={note} />
    </div>
  );
}
