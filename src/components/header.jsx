import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { FaBookReader } from "react-icons/fa"

export default function Header() {
  return (
    <header className="flex items-center justify-between h-12 px-10 border border-b">
      <Link href={"/"}>
        <h1 className="flex items-center gap-2 font-bold text-md text-foreground">
          <FaBookReader className="text-primary" />
          StudyHome
        </h1>
      </Link>

      <div>
        <UserButton showName={false} />
      </div>
    </header>
  )
}
