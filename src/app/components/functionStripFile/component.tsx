'use client';

import { Editor } from "@tiptap/react";
import { Flex, SimpleGrid } from "@mantine/core";
import classes from './styles.module.css';
import { Button } from "@mantine/core";

import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

import { invoke } from "@tauri-apps/api/core";
import { save } from "@tauri-apps/plugin-dialog";

interface FunctionStripFileProps {
  editor: Editor | null;
}

export default function FunctionStripFile({ editor }: FunctionStripFileProps) {
  
  if (!editor) return null;

  const openMarkdownFile = async () => {
    try {
      const filePath = await open({
        filters: [{ name: "Markdown", extensions: ["md"] }],
      });

      if (typeof filePath === "string") {
        const content = await readTextFile(filePath);
        editor.commands.setContent(content);
      }
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  const saveMarkdownFile = async () => {
    if (!editor) return;
  
    try {
      const filePath = await save({
        filters: [{ name: "Markdown", extensions: ["md"] }],
        defaultPath: "untitled.md",
      });
  
      if (filePath && typeof filePath === "string") {
        const content = editor.getHTML(); // alternativ: editor.getText() oder editor.getJSON()
        await invoke("save_markdown_file", {
          path: filePath,
          content,
        });
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  return (
    <div className={classes.functionStripDiv}>
      <Flex gap="xs" justify="flex-start" align="flex-center" direction="row" wrap="wrap">
        <SimpleGrid cols={3} spacing="2px" verticalSpacing="2px">
          <Button onClick={openMarkdownFile}>Open</Button>
          <Button onClick={saveMarkdownFile}>Save</Button>
        </SimpleGrid>
      </Flex>
    </div>
  );
}
