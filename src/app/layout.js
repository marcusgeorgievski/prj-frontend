// App layout

import { Inter } from "next/font/google"
import "./globals.css"
import ClerkAuthProvider from "@/components/auth/clerk-provider"
// import { currentUser } from "@clerk/nextjs/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Study Home",
  description: "The all-in-one Student Management Platform",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkAuthProvider>
          <main className="min-h-screen">{children}</main>
        </ClerkAuthProvider>
      </body>
    </html>
  )
}
