// Landing page

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import Link from "next/link"
import { RiDashboardFill } from "react-icons/ri"
import { LuFileType2 } from "react-icons/lu"
import { RiRobot2Fill } from "react-icons/ri"

export default async function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen pt-[200px]">
      {/* <header>
        <nav>about</nav>
      </header> */}

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
          <ClerkLoading>
            <Skeleton className="w-20 h-8" />
            <Skeleton className="w-20 h-8" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button>Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign up</Button>
            </SignUpButton>
          </ClerkLoaded>
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

      <div className="grid-flow-col md:grid grid-cols-3 mt-20  max-w-[800px] gap-4 space-y-4 md:space-y-0 p-4">
        <InfoBox title="Features" icon={RiDashboardFill}>
          Keep track of all your assignments on a single platform
        </InfoBox>

        <InfoBox title="Features" icon={LuFileType2}>
          Write and save notes in a rich text editor for all your study needs
        </InfoBox>

        <InfoBox title="Features" icon={RiRobot2Fill}>
          Use the power of AI to help you organize your assessments
        </InfoBox>
      </div>
    </main>
  )
}

function InfoBox({ title, icon, children }) {
  const Icon = icon
  return (
    <Card className="flex gap-3 p-4 ">
      <Icon className="flex-shrink-0 text-xl translate-y-1" />
      {children}
    </Card>
  )
}
