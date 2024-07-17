'use client';
import Link from 'next/link';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import NoteModal from './note-modal';
import NoteDropdown from './note-dropdown';
import { useEffect, useState } from 'react';
import { getClassById } from '@/actions/classes';
// import { ClassDropdown } from './class-dropdown';

export default function NoteCard({ noteData = exampleNoteData }) {
  const [classname, setClassname] = useState(null);
  const { name, note_id, content, class_id } = noteData;

  async function fetchClassname() {
    const classData = await getClassById(class_id);
    setClassname(classData[0].name);
  }

  useEffect(() => {
    //async func
    fetchClassname();
  }, [class_id]);

  return (
    <Link href={`/notes/${note_id}`}>
      <Card
        className={cn(
          'z-10 flex flex-col rounded-sm px-3 py-2 transition-all hover:bg-accent/50 mx-auto max-w-[500px] relative h-full justify-between'
        )}
      >
        <div
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <NoteModal noteData={noteData} action="update">
            <NoteDropdown noteData={noteData} />
          </NoteModal>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm m text-muted-foreground">
            {classname || '...'}
          </p>
        </div>
      </Card>
    </Link>
  );
}

const exampleNoteData = {
  note_id: '1',
  name: 'Note 1',
  class_id: '1',
};
