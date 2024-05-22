"use client"
import { ClerkProvider } from "@clerk/nextjs"

export default function ClerkAuthProvider({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
