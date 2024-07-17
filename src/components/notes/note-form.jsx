'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { FormInput } from '../forms/text-inputs';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ComboboxFormItem } from './class-combobox';
import { createNote, updateNote } from '@/actions/notes';

// Schema

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Note title must be at least 1 characters.',
  }),
  class_id: z.string().min(1, {
    message: 'Must select a class.',
  }),
});

// Component

export default function NoteForm({
  children,
  setDialogOpen,
  action, // create || update
  setSubmitFn,
  noteData,
  customSubmitHandler,
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const { note_id, name, content, class_id } = noteData || {};

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || '',
      class_id: class_id || '',
    },
  });

  // Set the submit function
  useEffect(() => {
    setSubmitFn(() => form.handleSubmit(onSubmit));
  }, []);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // console.log(values);
    const { name, class_id } = values;

    if (action === 'create') {
      await createNote(userId, name, class_id)
        .then(() => {
          form.reset();
          setDialogOpen(false);
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
      router.refresh();
      console.log('createeddd');
    }

    if (action === 'update') {
      await updateNote(note_id, name, content, class_id)
        .then(() => {
          form.reset();
          router.refresh();
          setDialogOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (action === 'lol') {
      await customSubmitHandler(values)
        .then(() => {
          console.log('yay');
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    router.refresh();
  }

  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-grow gap-2">
          <FormInput
            form={form}
            name="name"
            label="Title"
            placeholder="Pointer in C++"
            description=""
          />

          <ComboboxFormItem form={form} />
        </div>

        {children}
      </form>
    </Form>
  );
}
