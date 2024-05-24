"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { FormInput, FormTextarea } from "../forms/text-inputs"
import { useAuth } from "@clerk/nextjs"
import { createClass, updateClass } from "@/actions/classes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Schema

const formSchema = z.object({
  // name: z.string().min(2, {
  //   message: "Name must be at least 2 characters.",
  // }),
  // professor: z.string().optional(),
  // details: z
  //   .string()
  //   .max(100, {
  //     message: "Details must be at most 100 characters.",
  //   })
  //   .optional(),
})

// Component

export default function ClassForm({
  name,
  professor,
  details,
  children,
  setDialogOpen,
  classId,
  actionType, // create || update
}) {
  const { userId } = useAuth()

  useEffect(() => {
    // console.log("CLASS FORM:", action, name, professor, details, userId)
    console.log("CLASS FORM", form)
  }, [])

  // console.log(action, name, professor, details, userId)

  const router = useRouter()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: name || "",
      // professor: professor || "",
      // details: details || "",
    },
  })

  console.log(form.formState.errors)

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("SUBMIT:", actionType, values, classId, userId)
    if (actionType === "update") {
      setDialogOpen(false)
      // Update Class
      // await updateClass(classId, values.name, values.professor, values.details)
      //   .then(() => {
      //     form.reset()
      //     router.refresh()
      //     setDialogOpen(false)
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
    } else if (actionType === "create") {
      // Create Class
      await createClass(userId, values.name, values.professor, values.details)
        .then(() => {
          form.reset()
          router.refresh()
          setDialogOpen(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <Form {...form}>
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

        {/* {children} */}
        <button type="submit">submit</button>
      </form>
    </Form>
  )
}
