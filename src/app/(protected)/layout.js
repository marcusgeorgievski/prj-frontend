// Check if the user is authenticated, otherwise it will redirect to the login page.
"use client"

import Header from "@/components/header"
import Sidebar from "@/components/sidebar/sidebar"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/state/sidebar-state"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

export default function ProtectedLayout({ children }) {
  const { isOpen } = useSidebar()

  console.log(isOpen)
  return (
    <div className="min-h-screen">
      <SignedIn>
        <Header />
        <main className="flex h-[calc(100vh-48px)]">
          <div>
            <Sidebar />
          </div>
          <div className={cn("p-5 sm:p-8 w-full")}>{children}</div>
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
