"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { FormInput, FormTextarea } from "../forms/text-inputs"
import { useAuth } from "@clerk/nextjs"
import { createClass } from "@/actions/classes"
import { useRouter } from "next/navigation"

// Schema

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  professor: z.string(),
  details: z.string().max(100, {
    message: "Details must be at most 100 characters.",
  }),
})

// Component

export default function ClassForm({ name, professor, details, children, fn }) {
  const { userId } = useAuth()

  const router = useRouter()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      professor: professor || "",
      details: details || "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    await createClass(userId, values.name, values.professor, values.details)
      .then(() => {
        form.reset()
        router.refresh()
        fn(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Form {...form}>
      {/* onSubmit={form.handleSubmit(onSubmit)}  */}
      <form action={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-grow gap-2 md:flex-row md:justify-between">
          <FormInput
            form={form}
            name="name"
            label="Class"
            placeholder="PRJ566"
            description=""
          />

          <FormInput
            form={form}
            name="professor"
            label="Professor"
            placeholder="Prof. Yasser E"
            description=""
          />
        </div>

        <FormTextarea
          form={form}
          name="details"
          label="Details"
          placeholder="Details"
          description=""
        />
        {children}
      </form>
    </Form>
  )
}
