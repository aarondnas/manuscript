import { Editor, EditorContent } from "@tiptap/react";
import classes from './stylesheet.module.css';

interface TiptapEditorProps {
  editor: Editor | null;
}

export default function TiptapEditor({ editor }: TiptapEditorProps) {
  if (!editor) return null;

  return (
    <div className={classes.a4Container}>
      <div className={classes.editorContainer}>
        <EditorContent 
        editor={editor} 
        style={{
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
          caretColor: '#000'
        }}
        className={classes.editorContainer}
        />
      </div>
    </div>
  );
}
