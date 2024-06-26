"use client"

import { useSidebar } from "@/state/sidebar-state"
import { UserButton } from "@clerk/nextjs"
import { ArrowRightLeftIcon } from "lucide-react"
import Link from "next/link"
import { FaBookReader } from "react-icons/fa"

export default function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex items-center justify-between h-12 px-10 border border-b">
      {/* Sidebar toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleSidebar()
        }}
        id="sidebar-toggle"
        className="bg-muted-foreground/20 px-1.5 py-0 rounded transition-all absolute left-3 "
      >
        <ArrowRightLeftIcon className="w-3 text-muted-foreground" />
      </button>

      <Link href={"/"} className="ml-4">
        <h1 className="flex items-center gap-2 font-bold text-md text-foreground">
          <FaBookReader className="text-primary" />
          StudyHome
        </h1>
      </Link>

      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
