// App layout

import { Inter } from "next/font/google"
import "./globals.css"
import ClerkAuthProvider from "@/components/auth/clerk-provider"
import { currentUser } from "@clerk/nextjs/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SMP",
  description: "Student Management Platform",
}

export default async function RootLayout({ children }) {
  const user = await currentUser()
  console.log(user.primaryEmailAddress.emailAddress)
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkAuthProvider>{children}</ClerkAuthProvider>
      </body>
    </html>
  )
}
