import { Editor } from "@tiptap/react";

export const handleToggleHeading = (editor: Editor | null, level: 1 | 2 | 3 | 4 | 5 | 6) => {
  if (!editor) return;
  editor.chain().focus().toggleHeading({ level }).run();
};

export const handleToggleBold = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleBold().run();
};

export const handleToggleItalic = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleItalic().run();
};

export const handleToggleStrike = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleStrike().run();
};

export const handleToggleCode = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleCode().run();
};

export const handleToggleBulletList = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleBulletList().run();
};

export const handleToggleOrderedList = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleOrderedList().run();
};

export const handleToggleBlockquote = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleBlockquote().run();
};

export const handleSetHorizontalRule = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().setHorizontalRule().run();
};

export const handleToggleTaskList = (editor: Editor | null) => {
  if (!editor) return;
}

export const handleToggleTextColor = (editor: Editor | null, color: string) => {
  if (!editor) return;
  editor?.chain().focus().setColor(color).run()
}

export const handleToggleUnderline = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().toggleUnderline().run();
};
