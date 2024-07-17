'use client';
import { getNotesByClassId, getNotesByUserId } from '@/actions/notes';
import NoteActionButton from '@/components/notes/note-button';
import NoteCard from '@/components/notes/note-card';
import { useEffect, useState } from 'react';

export default function NotesTab({ userId, classId }) {
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    // const notes = await getNotesByUserId(userId);
    const notes = await getNotesByClassId(classId);
    return notes.filter((note) => note.class_id === classId);
  }

  useEffect(() => {
    getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="my-4">
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
