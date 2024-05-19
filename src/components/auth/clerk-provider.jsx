import { ClerkProvider } from "@clerk/nextjs"

export default async function ClerkAuthProvider({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
