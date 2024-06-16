"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { FormInput, FormTextarea } from "../forms/text-inputs"
import { useAuth } from "@clerk/nextjs"
//import { createClass, updateClass } from "@/actions/classes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Schema

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  professor: z.string().optional(),
  description: z
    .string()
    .max(100, {
      message: "Description must be at most 100 characters.",
    })
    .optional(),
})

// Component

export default function ClassForm({
  children,
  setDialogOpen,
  action, // create || update
  setSubmitFn,
  classData,
}) {
  const { userId } = useAuth()
  const router = useRouter()

  const { asessment_id, title, description, weight, dueDate } = classData || {}

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      status: status || "",
      weight: weight || "",
      dueDate: dueDate || "",
    },
  })

  // Set the submit function
  useEffect(() => {
    setSubmitFn(() => form.handleSubmit(onSubmit))
  }, [])

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // if (action === "update") {
    //   // Update Class
    //   await updateClass(class_id, values.name, values.professor, values.details)
    //     .then(() => {
    //       form.reset()
    //       router.refresh()
    //       setDialogOpen(false)
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // } else if (action === "create") {
    //   // Create Class
    //   await createClass(userId, values.name, values.professor, values.details)
    //     .then(() => {
    //       form.reset()
    //       router.refresh()
    //       setDialogOpen(false)
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }
    console.log(values)
  }

  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-grow gap-2 md:flex-row md:justify-between">
          <FormInput
            form={form}
            name="title"
            label="Title"
            placeholder="Assessment"
            description=""
          />
        </div>
        

        <FormTextarea
          form={form}
          name="description"
          label="Description"
          placeholder="Description"
          description=""
        />

        {children}
      </form>
    </Form>
  )
}
