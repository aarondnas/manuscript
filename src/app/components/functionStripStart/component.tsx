'use client';

import { useState,  useEffect } from 'react';
import { Editor } from "@tiptap/react";
import { Flex, ColorInput, SimpleGrid } from "@mantine/core";
import classes from './stylesheet.module.css';
import {
  handleToggleHeading,
  handleToggleBold,
  handleToggleItalic,
  handleToggleStrike,
  handleToggleCode,
  handleToggleBulletList,
  handleToggleOrderedList,
  handleToggleBlockquote,
  handleSetHorizontalRule,
  handleToggleTaskList,
  handleToggleTextColor
} from './handler';
import BoldIcon from '@/public/icons/frontend/iconmonstr-bold.svg';
import { iconBold } from '../svgIcons/index';

interface FunctionStripStartProps {
  editor: Editor | null;
}

export default function FunctionStripStart({ editor }: FunctionStripStartProps) {
  
  if (!editor) return null;
  
  const [valueTextColor, setValue] = useState('');
  
  useEffect(() => {
    if (!editor) return; // Nur ausführen, wenn editor existiert
    const defaultColor = '#000000';
    setValue(defaultColor);
    handleToggleTextColor(editor, defaultColor);
  }, [editor]);
  

  return (
    <div className={classes.functionStripDiv}>
      <Flex gap="xs" justify="flex-start" align="flex-center" direction="row" wrap="wrap">

        <SimpleGrid cols={3} spacing="2px" verticalSpacing="2px">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button className={classes.ButtonFunctionDefault} key={level} onClick={() => handleToggleHeading(editor, level as 1 | 2 | 3 | 4 | 5 | 6)}>
              H{level}
            </button>
          ))}
        </SimpleGrid>
        <button onClick={() => handleToggleBold(editor)}><div className={classes.svgIconDiv}><iconBold/></div></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleItalic(editor)}>Italic</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => { handleToggleBold(editor); handleToggleItalic(editor); }}>Bold+Italic</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleStrike(editor)}>Strikethrough</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleCode(editor)}>Inline Code</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleBulletList(editor)}>Bullet List</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleOrderedList(editor)}>Ordered List</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleBlockquote(editor)}>Quote</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleSetHorizontalRule(editor)}>HR</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleTaskList(editor)}>Checkbox</button>
        <ColorInput
          value={valueTextColor}
          onChangeEnd={(textColor) => {
            setValue(textColor);
            handleToggleTextColor(editor, textColor);
          }}
          placeholder="Text Color"
        />
      </Flex>
    </div>
  );
}