'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { useState } from 'react';
import OrderedList from '@tiptap/extension-ordered-list';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import Toolbar from './toolbar';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Editor({ note }) {
  const [content, setContent] = useState(note.content);

  console.log(note);

  const { toast } = useToast();

  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      OrderedList,
      ListItem,
      Heading,
    ],
    editorProps: {
      attributes: {
        class:
          'border p-2 rounded min-h-[400px] focus:outline-slate-200 editor',
      },
      handleKeyDown(view, event) {
        if (event.key === 'Tab') {
          event.preventDefault(); // Prevent default tab behavior
          const { selection } = view.state;
          const { from, to } = selection;
          const range = { from, to };
          const tr = view.state.tr;
          tr.insertText('\t', range.from, range.to);
          view.dispatch(tr);
        }
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  if (!editor) {
    return null;
  }

  async function handleSave(values) {
    console.log(values);
    // console.log('SAVING', note.note_id, name, content, classId);
    await updateNote(note.note_id, values.name, content, values.class_id)
      .then(() => {
        toast({
          title: 'Note Saved',
          variant: 'success',
        });
      })
      .catch((error) => {
        toast({
          title: 'Error Saving Note',
          description: error.message,
          variant: 'destructive',
        });
      });
  }

  return (
    <div>
      {/* <Input
        placeholder="Title"
        className="mb-3 text-xl border-none shadow-none"
        // defaultValue={title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ComboboxFormItem /> */}
      <NoteForm
        setDialogOpen={() => {}}
        action="lol"
        noteData={note}
        setSubmitFn={() => {}}
        customSubmitHandler={handleSave}
      >
        <br />
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />

        <div className="flex items-center justify-end gap-3 mt-4">
          <DeleteDialog noteId={note.note_id}>
            <Button className="font-semibold" size="icon" variant="ghost">
              <Trash size={18} />
            </Button>
          </DeleteDialog>

          <Button
            className="font-semibold"
            variant=""
            // onClick={handleSave}
            type="submit"
          >
            Save
          </Button>
        </div>
      </NoteForm>
    </div>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteNote, updateNote } from '@/actions/notes';
import { useRouter } from 'next/navigation';
import { ComboboxFormItem } from './class-combobox';
import NoteForm from './note-form';

function DeleteDialog({ children, noteId }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteNote(noteId);
    router.push('/notes');
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle className="text-center">
          Permanently delete note?
        </AlertDialogTitle>
        <div className="flex justify-center gap-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-0 w-fit">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
