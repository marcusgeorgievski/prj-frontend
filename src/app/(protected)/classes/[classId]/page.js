import { getNotesByClassId } from '@/actions/notes';
import { currentUser } from '@clerk/nextjs/server';
import NoteActionButton from '@/components/notes/note-button';
import NoteCard from '@/components/notes/note-card';
import { AssessmentsTab } from './assessment-tab';
import { getClasses } from '@/actions/classes';

export default async function ClassSlugPage({
  params: { classId },
  searchParams: { tab },
}) {
  const user = await currentUser();
  const notes = await getNotesByClassId(classId);

  if (!user || tab == null) {
    return null;
  }

  //get class list for create assessmeny
  const classes = await getClasses(user.id);

  const classesList = classes.map((classTemp) => {
    return {
      class_id: classTemp.class_id,
      name: classTemp.name,
    };
  });

  // Display notes

  if (tab === 'notes') {
    return (
      <div className="w-full">
        <div className="mt-6 mb-4">
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

  // Display assessments

  if (tab === 'assessments') {
    return (
      <div className="w-full">
        <AssessmentsTab classId={classId} classesList={classesList} />
      </div>
    );
  }
}
