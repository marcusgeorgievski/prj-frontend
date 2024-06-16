"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { FormInput, FormTextarea } from "../forms/text-inputs"
import { FormSelect } from "../forms/select-input"
import { Calendar } from "@/components/ui/calendar"
import { useAuth } from "@clerk/nextjs"
import { createAssessment, updateAssessment } from "@/actions/assessments"
import { getClasses } from "@/actions/classes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Schema

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  class: z.string().min(1, {
    message: "Please select a class.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
  description: z
    .string()
    .max(100, {
      message: "Description must be at most 100 characters.",
    })
    .optional(),
  weight: z.coerce.number().min(0, {
    message: "Weight must be at least 0.",
  }).max(100, {
    message: "Weight must be at most 100.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
})

// Component

export default function AssessmentForm({
  children,
  setDialogOpen,
  action, // create || update
  setSubmitFn,
  assessmentData,
}) {
  const { userId } = useAuth()
  const router = useRouter()
  const [classes, setClasses] = useState([])

  useEffect(() => {
    async function fetchClasses() {
      const fetchedClasses = await getClasses(userId)
      const classOptions = fetchedClasses.map(cls => ({
        value: cls.id,
        label: cls.name
      }))
      setClasses(classOptions)
    }

    fetchClasses()
  }, [userId])

  const { assessment_id, title, class: className, status, description, weight, dueDate } = assessmentData || {}

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      class: className || "",
      status: status || "",
      description: description || "",
      weight: weight || 0,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
    },
  })

  // Set the submit function
  useEffect(() => {
    setSubmitFn(() => form.handleSubmit(onSubmit))
  }, [])

  // 2. Define a submit handler.
  async function onSubmit(values) {
    if (action === "update") {
      // Update Assessment
      await updateAssessment(assessment_id, values)
        .then(() => {
          form.reset()
          router.refresh()
          setDialogOpen(false)
        })
        .catch((error) => {
          console.error(error)
        })
    } else if (action === "create") {
      // Create Assessment
      await createAssessment(userId, values)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow space-y-4">
            <FormInput
              form={form}
              name="title"
              label="Title"
              placeholder="Midterm Exam"
              description=""
            />

            <FormSelect
              form={form}
              name="class"
              label="Class"
              options={classes}
              description=""
              className="font-sans"
            />

            <FormSelect
              form={form}
              name="status"
              label="Status"
              options={[
                { value: 'not_started', label: 'Not Started' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' }
              ]}
              description=""
              className="font-sans"
            />

            <FormTextarea
              form={form}
              name="description"
              label="Description"
              placeholder="Description"
              description=""
              className="font-sans"
            />

            <FormInput
              form={form}
              name="weight"
              label="Weight"
              placeholder="20"
              description="Weight of the assessment as a percentage"
              type="number"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <label htmlFor="dueDate" className="font-medium text-gray-700">Due Date</label>
            <Calendar
              mode="single"
              form={form}
              selected={dueDate}
              name="dueDate"
              label="Due Date"
              className="rounded-md border"
            />
          </div>
        </div>

        {children}
      </form>
    </Form>
  )
}
