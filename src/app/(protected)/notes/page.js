import PageTitle from '@/components/page-title';
import { currentUser } from '@clerk/nextjs/server';
import { PiNotePencilLight } from 'react-icons/pi';

export default async function NotesPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // simulate fetch with timeout promise
  const getNotes = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Note 1', content: 'Content 1' },
          { id: 2, title: 'Note 2', content: 'Content 2' },
          { id: 3, title: 'Note 3', content: 'Content 3' },
        ]);
      }, 1000);
    });
  };

  const notes = await getNotes(user);

  return (
    <div className="w-full ">
      <PageTitle icon={PiNotePencilLight}>Notes</PageTitle>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </div>
    </div>
  );
}
