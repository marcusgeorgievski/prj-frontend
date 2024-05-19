// Landing page

import { Button } from "@/components/ui/button"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import Link from "next/link"
import { RiDashboardFill } from "react-icons/ri"

export default async function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="mb-4 text-6xl font-bold text-primary">Study Home</h1>
        <p className="text-foreground">
          The student management platform for all your needs
        </p>
      </div>

      <SignedOut>
        <div className="flex justify-between w-[200px]">
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <Link href="/dashboard">
          <Button href="/dashboard">
            {" "}
            <RiDashboardFill className="mr-2" /> Dashboard
          </Button>
        </Link>
      </SignedIn>
    </main>
  )
}
