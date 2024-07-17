import Editor from '@/components/notes/editor';

export default function NotePage({ params: { noteId } }) {
  return (
    <div>
      <p>{noteId}</p>
      <Editor />
    </div>
  );
}
