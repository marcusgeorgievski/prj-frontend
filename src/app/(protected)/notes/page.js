import { getNoteById, getNotesByUserId } from '@/actions/notes';
import NoteActionButton from '@/components/notes/note-button';
import NoteCard from '@/components/notes/note-card';
import PageTitle from '@/components/page-title';
import { currentUser } from '@clerk/nextjs/server';
import { PiNotePencilLight } from 'react-icons/pi';

export default async function NotesPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const notes = await getNotesByUserId(user.id);

  if (!notes) {
    return <p className="text-center py-20">Could not fetch notes</p>;
  }

  return (
    <div className="w-full ">
      <PageTitle icon={PiNotePencilLight}>Notes</PageTitle>

      <div className="mb-4">
        <NoteActionButton button />
      </div>

      {notes.length === 0 ? (
        <p className="pt-[15vh] mx-auto text-center">No notes yet!</p>
      ) : (
        <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <NoteCard key={note.note_id} noteData={note} />
          ))}
        </div>
      )}
    </div>
  );
}
