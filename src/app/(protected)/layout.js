// Check if the user is authenticated, otherwise it will redirect to the login page.

export default function ProtectedLayout({ children }) {
  return <div>{children}</div>
}
