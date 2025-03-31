'use client'; // This must be the very first line

import { useState } from 'react';
import FunctionStripStart from '../../components/functionStripStart/component';
import FunctionStripFile from '../../components/functionStripFile/component';
import MainViewHeader from '../../components/mainViewHeader/component';
import TiptapEditor from "../../components/tipTapEditor/component.tsx";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import classes from './stylesheet.module.css';
import Underline from "@tiptap/extension-underline";
import { Loader } from '@mantine/core';

export default function Main() {
  const [activeTab, setActiveTab] = useState('Start');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      TextStyle,
      Color,
      Underline
    ],
  });

  const handleTabChange = (tab: string | null) => {
    if (tab) setActiveTab(tab);
  };

  if (!editor) return <Loader color="gray" />;;

  return (
    <div>
      <MainViewHeader onTabChange={handleTabChange} />
      {activeTab === 'File' && (
        <FunctionStripFile editor={editor} />
      )}
      {activeTab === 'Start' && (
        <FunctionStripStart editor={editor} />
      )}
      <div className={classes.bodyDiv}>
        <TiptapEditor editor={editor} />
      </div>
    </div>
  );
}