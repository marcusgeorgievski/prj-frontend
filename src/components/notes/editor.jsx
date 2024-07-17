'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { useEffect, useState } from 'react';
import {
  Bold, //
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Head } from 'react-day-picker';
import { Separator } from '../ui/separator';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import Toolbar from './toolbar';

export default function Editor() {
  const [content, setContent] = useState(null);

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
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto ">
      {content}
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
