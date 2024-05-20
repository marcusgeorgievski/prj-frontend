import React from "react"

export default function Heading({ icon, children }) {
  const Icon = icon
  return (
    <div className="flex items-center gap-4 pb-1 mb-8 text-xl font-bold border-b">
      <Icon /> {children}
    </div>
  )
}
