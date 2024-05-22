import PageTitle from "@/components/page-title";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiNotePencilLight } from "react-icons/pi";

export default function NotesPage() {
  return (
    <div className="w-full ">
      <PageTitle icon={PiNotePencilLight}>Notes</PageTitle>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
}

export function NoteCard({ noteData }) {
  return (
    <Link href={`/notes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px]"
        )}
      >
        <h3 className="text-lg font-bold">Pointers</h3>
        <p className="mb-2 text-sm font-light text-muted-foreground">
          OOP345
        </p>

        <div className="text-sm font-light">
          <p>Note Detail</p>
          <p>Note Content</p>
        </div>
      </Card>
    </Link>
  );
}
