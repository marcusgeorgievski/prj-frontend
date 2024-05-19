// Check if the user is authenticated, otherwise it will redirect to the login page.

import Header from "@/components/header"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

export default function ProtectedLayout({ children }) {
  return (
    <div>
      <SignedIn>
        <Header />
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}
