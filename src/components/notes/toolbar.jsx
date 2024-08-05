'use client';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';
import {
  Bold, //
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from 'lucide-react';

export default function Toolbar({ editor }) {
  return (
    <div className="flex items-center p-1 mb-2 space-x-2 border rounded border-slate-200">
      <StyleButtons editor={editor} />
      <Separator orientation="vertical" className="h-5" />
      <HeadingButtons editor={editor} />
      <Separator orientation="vertical" className="h-5" />
      <ListButtons editor={editor} />
    </div>
  );
}

function StyleButtons({ editor }) {
  return (
    <div className="flex gap-1">
      <Toggle
        size="icon"
        pressed={editor.isActive('bold')}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold />
      </Toggle>

      <Toggle
        size="icon"
        pressed={editor.isActive('italic')}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic />
      </Toggle>
    </div>
  );
}

function HeadingButtons({ editor }) {
  return (
    <div className="flex gap-1">
      <Toggle
        size="icon"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <Heading1 />
      </Toggle>

      <Toggle
        size="icon"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 />
      </Toggle>

      <Toggle
        size="icon"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <Heading3 />
      </Toggle>
    </div>
  );
}

function ListButtons({ editor }) {
  return (
    <div className="flex gap-1">
      <Toggle
        size="icon"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List />
      </Toggle>

      <Toggle
        size="icon"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered />
      </Toggle>
    </div>
  );
}
