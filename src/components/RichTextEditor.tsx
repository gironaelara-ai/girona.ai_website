import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Unlink } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const menuButtons = [
    {
      icon: <Heading1 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      title: 'Heading 1',
    },
    {
      icon: <Heading2 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      title: 'Heading 2',
    },
    {
      icon: <Heading3 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      title: 'Heading 3',
    },
    {
      icon: <Bold size={18} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      title: 'Bold',
    },
    {
      icon: <Italic size={18} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      title: 'Italic',
    },
    {
      icon: <List size={18} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      icon: <ListOrdered size={18} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      icon: <LinkIcon size={18} />,
      onClick: setLink,
      isActive: editor.isActive('link'),
      title: 'Add Link',
    },
    {
      icon: <Unlink size={18} />,
      onClick: () => editor.chain().focus().unsetLink().run(),
      isActive: false,
      title: 'Remove Link',
      disabled: !editor.isActive('link'),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 border-b border-border p-2 bg-muted/20">
      {menuButtons.map((btn, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            btn.onClick();
          }}
          disabled={btn.disabled}
          title={btn.title}
          className={`p-2 rounded-md hover:bg-muted transition-colors ${
            btn.isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
          } ${btn.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  // Keep content in sync if it changes externally (e.g. initial load)
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      // Need precise handling so we don't reset cursor position during active typing
      // Only set content if we are NOT currently focused. For initial load this is fine.
      if (!editor.isFocused) {
        editor.commands.setContent(content || '');
      }
    }
  }, [content, editor]);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
