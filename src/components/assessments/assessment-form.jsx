import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { FormInput, FormTextarea } from '../forms/text-inputs';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@clerk/nextjs';
import { createAssessment, updateAssessment } from '@/actions/assessments';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  class: z.string().min(1, {
    message: 'Please select a class.',
  }),
  status: z.string().min(1, {
    message: 'Please select a status.',
  }),
  description: z
    .string()
    .max(100, {
      message: 'Description must be at most 100 characters.',
    })
    .optional(),
  weight: z.coerce
    .number()
    .min(0, {
      message: 'Weight must be at least 0.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    }),
  dueDate: z.date({
    required_error: 'Please select a due date.',
  }),
}).refine((data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
  
  if (data.status === 'overdue' || data.status === 'completed') {
    return true; // Allow past dates for 'overdue' status
  } else {
    return data.dueDate >= today;
  }
}, {
  message: "Can't have an assessment due in the past unless its status is overdue.",
  path: ['dueDate'], // This will make the error appear on the dueDate field
});

// Mapping for status names
const statusMapping = {
  'not started': 'Not Started',
  upcoming: 'Upcoming',
  completed: 'Completed',
  overdue: 'Overdue',
};

export default function AssessmentForm({
  action,
  setSubmitFn,
  assessmentData,
  classesList,
  setDialogOpen,
  onCreate,
  onEdit,
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
  const formattedClassesList = classesList.map((cls) => ({
    value: cls.class_id,
    label: cls.name,
  }));

  const defaultValues = {
    name: name || '',
    class: className || formattedClassesList[0]?.value || '',
    status: status || 'not started',
    description: description || '',
    weight: weight || 0,
    dueDate: dueDate ? new Date(dueDate) : new Date(),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // useEffect(() => {
  //   if (assessmentData) {
  //     form.reset(defaultValues);
  //   }
  //   setSubmitFn(() => form.handleSubmit(onSubmit));
  // }, [assessmentData]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'status' || name === 'dueDate') {
        form.trigger(['status', 'dueDate']);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (assessmentData) {
      const formattedDueDate = assessmentData.dueDate 
        ? new Date(assessmentData.dueDate) 
        : new Date();
      
      form.reset({
        ...defaultValues,
        name: assessmentData.name || '',
        class: assessmentData.class || '',
        status: assessmentData.status || 'not started',
        description: assessmentData.description || '',
        weight: assessmentData.weight || 0,
        dueDate: formattedDueDate,
      });
    } else {
      form.reset(defaultValues);
    }
    setSubmitFn(() => form.handleSubmit(onSubmit));
  }, [assessmentData, form, setSubmitFn]);

  async function onSubmit(values) {
    try {
      if (action === 'update') {
        const updatedAssessment = await updateAssessment(assessment_id, {
          ...values,
          classId: values.class,
        });
        if (onEdit) {
          onEdit(updatedAssessment);
        }
      } else if (action === 'create') {
        const newAssessment = await createAssessment(userId, {
          ...values,
          classId: values.class,
        });
        if (onCreate) {
          onCreate(newAssessment);
        }
      }
      form.reset();
      router.refresh();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
      >
        <div className="space-y-4">
          <FormInput
            form={form}
            name="name"
            label="Name"
            placeholder="Assessment Name"
            description=""
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <Controller
              name="class"
              control={form.control}
              render={({ field }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="px-2 py-1 border border-gray-300 rounded cursor-pointer text-md">
                      {formattedClassesList.find(
                        (cls) => cls.value === field.value
                      )?.label || 'Select Class'}
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
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="px-2 py-1 border border-gray-300 rounded cursor-pointer text-md">
                      {statusMapping[field.value] || 'Select Status'}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.keys(statusMapping).map((key) => (
                      <DropdownMenuItem
                        key={key}
                        onSelect={() => field.onChange(key)}
                      >
                        {statusMapping[key]}
                      </DropdownMenuItem>
                    ))}
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
        </div>

        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="dueDate"
            className="mb-2 font-medium text-gray-700"
          >
            Due Date
          </label>
          <Controller
            name="dueDate"
            control={form.control}
            render={({ field }) => (
              <>
                <Calendar
                mode="single"
                selected={field.value || new Date()}  // Use new Date() as fallback
                onSelect={(date) => field.onChange(date || new Date())}
                className="border rounded-md"
              />
                {form.formState.errors.dueDate && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.dueDate.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </form>
    </Form>
  );
}