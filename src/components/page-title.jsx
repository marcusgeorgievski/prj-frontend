import React from "react"

export default function PageTitle({ icon, children }) {
  const Icon = icon
  return (
    <div className="flex items-center gap-4 pb-1 mb-8 text-2xl font-bold border-b">
      <Icon /> {children}
    </div>
  )
}
