// import { getClasses } from '@/actions/classes';
import { currentUser } from '@clerk/nextjs/server';
import { AssessmentsTab } from '@/components/assessments/assessment-tab';
import NotesTab from './notes-tab';
import SearchParamButtons from './search-params-buttons';
import { getClassById } from '@/actions/classes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ClassSlugLayout({
  children,
  params: { classId },
}) {
  // const [classData, setClassData] = useState(null);
  // // Set intial tab to `assessments`
  // useEffect(() => {
  //   const getClassData = async (userId) => {
  //     const classes = await getClasses(userId);
  //     const c = classes.find((c) => c.class_id === classId);
  //     setClassData(c);
  //   };

  //   getClassData(userId);
  // }, []);

  // if (classData === null) {
  //   return null;
  // }

  // const { userId } = currentUser();

  let classData = await getClassById(classId);
  classData = classData[0];

  return (
    <div>
      <Link href="/classes">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 mb-4 text-muted-foreground"
        >
          <ArrowLeft size={14} />
          All classes
        </Button>
      </Link>

      <div className="mb-5">
        <h1 className="text-3xl font-bold">{classData.name}</h1>
        <p className="text-muted-foreground">{classData.professor}</p>
        <p className="text-muted-foreground">{classData.details}</p>
      </div>

      <SearchParamButtons />

      {children}

      {/* <div>
        {tab === 'assessments' && (
          <AssessmentsTab classId={classId} classData={classData} />
        )}
        {tab === 'notes' && <NotesTab userId={userId} classId={classId} />}
      </div> */}
    </div>
  );
}
