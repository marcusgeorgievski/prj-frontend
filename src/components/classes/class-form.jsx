'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { FormInput, FormTextarea } from '../forms/text-inputs';
import { useAuth } from '@clerk/nextjs';
import { createClass, updateClass } from '@/actions/classes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Schema

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  professor: z.string().optional(),
  details: z
    .string()
    .max(100, {
      message: 'Details must be at most 100 characters.',
    })
    .optional(),
});

// Component

export default function ClassForm({
  children,
  setDialogOpen,
  action, // create || update
  setSubmitFn,
  classData,
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const { class_id, name, professor, details } = classData || {};

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || '',
      professor: professor || '',
      details: details || '',
    },
  });

  // Set the submit function
  useEffect(() => {
    setSubmitFn(() => form.handleSubmit(onSubmit));
  }, []);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    if (action === 'update') {
      // Update Class
      await updateClass(
        class_id,
        values.name,
        values.professor,
        values.details
      )
        .then(() => {
          form.reset();
          router.refresh();
          setDialogOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (action === 'create') {
      // Create Class
      await createClass(
        userId,
        values.name,
        values.professor,
        values.details
      )
        .then(() => {
          form.reset();
          router.refresh();
          setDialogOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
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

        {children}
      </form>
    </Form>
  );
}
