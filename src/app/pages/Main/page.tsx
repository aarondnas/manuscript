'use client'; // This must be the very first line

import { useState } from 'react';
import FunctionStripStart from '../../components/functionStripStart/component';
import MainViewHeader from '../../components/mainViewHeader/component';
import TiptapEditor from "../../components/tipTapEditor/component.tsx";
import { Button, Group } from "@mantine/core";
import { marked } from "marked";
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import classes from './stylesheet.module.css';

export default function Main() {
  const [activeTab, setActiveTab] = useState('Start');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      TextStyle,
      Color,
    ],
  });

  const handleTabChange = (tab: string | null) => {
    if (tab) setActiveTab(tab);
  };

  const handleExport = async (format: "md" | "html") => {
    const content = localStorage.getItem("markdownContent") || "";
    const filePath = await save({
      defaultPath: `document.${format}`,
      filters: [{ name: format.toUpperCase(), extensions: [format] }],
    });
  
    if (filePath) {
      if (format === "html") {
        const html = await marked.parse(content);
        await writeTextFile(filePath, html);
      } else {
        await writeTextFile(filePath, content);
      }
    }
  };

  return (
    <div>
      <MainViewHeader onTabChange={handleTabChange} />
      {activeTab === 'Start' && (
        <FunctionStripStart editor={editor} />
      )}
      <div className={classes.bodyDiv}>
        <TiptapEditor editor={editor} />
      </div>
      <Group mt="md">
        <Button onClick={() => handleExport("md")}>Export Markdown</Button>
        <Button onClick={() => handleExport("html")}>Export HTML</Button>
      </Group>
    </div>
  );
}