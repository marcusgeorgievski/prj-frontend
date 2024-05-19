import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { FaBookReader } from "react-icons/fa"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 border border-b h-14">
      <Link href={"/"}>
        <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
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
