import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput, FormTextarea } from "../forms/text-inputs";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@clerk/nextjs";
import { createAssessment, updateAssessment } from "@/actions/assessments";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
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
  weight: z.coerce
    .number()
    .min(0, {
      message: "Weight must be at least 0.",
    })
    .max(100, {
      message: "Weight must be at most 100.",
    }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
});

export default function AssessmentForm({
  children,
  setDialogOpen,
  action,
  setSubmitFn,
  assessmentData,
  classesList
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const {
    assessment_id,
    name,
    class: className,
    status,
    description,
    weight,
    dueDate,
  } = assessmentData || {};

  // Ensure the options are in the correct format
  const formattedClassesList = classesList.map(cls => ({
    value: cls.class_id,
    label: cls.name,
  }));

  const defaultValues = {
    name: name || "",
    class: className || formattedClassesList[0]?.value || "",
    status: status || "not_started",
    description: description || "",
    weight: weight || 0,
    dueDate: dueDate ? new Date(dueDate) : new Date(),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (assessmentData) {
      form.reset(defaultValues);
    }
    setSubmitFn(() => form.handleSubmit(onSubmit));
  }, [assessmentData]);

  async function onSubmit(values) {
    try {
      if (action === "update") {
        await updateAssessment(assessment_id, values);
      } else if (action === "create") {
        await createAssessment(userId, {
          ...values,
          classId: values.class,
        });
      }
      form.reset();
      router.refresh();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Dialog open={true} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Create Assessment" : "Edit Assessment"}
          </DialogTitle>
          <DialogDescription>Enter Assessment details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              form={form}
              name="name"
              label="Name"
              placeholder="Assessment Name"
              description=""
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <Controller
                name="class"
                control={form.control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="cursor-pointer text-md border border-gray-300 rounded px-2 py-1">
                        {formattedClassesList.find(cls => cls.value === field.value)?.label || "Select Class"}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Class</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {formattedClassesList.map((cls) => (
                        <DropdownMenuItem
                          key={cls.value}
                          onSelect={() => field.onChange(cls.value)}
                        >
                          {cls.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="cursor-pointer text-md border border-gray-300 rounded px-2 py-1">
                        {field.value || "Select Status"}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => field.onChange("not_started")}
                      >
                        Not Started
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("in_progress")}
                      >
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("completed")}
                      >
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>

            <FormTextarea
              form={form}
              name="description"
              label="Description"
              placeholder="Description"
              description=""
            />

            <FormInput
              form={form}
              name="weight"
              label="Weight"
              placeholder="20"
              description="Weight of the assessment as a percentage"
              type="number"
            />

            <div className="flex flex-col items-center justify-center">
              <label htmlFor="dueDate" className="font-medium text-gray-700">
                Due Date
              </label>
              <Calendar
                mode="single"
                form={form}
                selected={dueDate}
                name="dueDate"
                label="Due Date"
                className="rounded-md border"
              />
            </div>

            <DialogFooter className="gap-2 mt-6">
              <DialogClose asChild>
                <Button onClick={() => setDialogOpen(false)} variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
