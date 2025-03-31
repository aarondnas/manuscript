'use client';

import { useState,  useEffect } from 'react';
import { Editor } from "@tiptap/react";
import { Flex, ColorInput, SimpleGrid } from "@mantine/core";
import classes from './styles.module.css';

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
  handleToggleTextColor,
  handleToggleUnderline
} from './handler';


import IconBold from '@/app/assets/icons/iconmonstr-bold.svg';
import IconItalic from '@/app/assets/icons/iconmonstr-italics.svg';
import IconUnderlined from '@/app/assets/icons/iconmonstr-underlined.svg';
import IconCrossedOut from '@/app/assets/icons/iconmonstr-crossed_out.svg';
import IconBulletList from '@/app/assets/icons/iconmonstr-bullet_list.svg';
import IconOrderedList from '@/app/assets/icons/iconmonstr-ordered_list.svg';


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
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleBold(editor)}><IconBold className={classes.svgIcon}/></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleItalic(editor)}><IconItalic className={classes.svgIcon}/></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleStrike(editor)}><IconCrossedOut className={classes.svgIcon}/></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleBulletList(editor)}><IconBulletList className={classes.svgIcon}/></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleOrderedList(editor)}><IconOrderedList className={classes.svgIcon}/></button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleUnderline(editor)}><IconUnderlined className={classes.svgIcon}/></button>

        {/*
        <button className={classes.ButtonFunctionDefault} onClick={() => { handleToggleBold(editor); handleToggleItalic(editor); }}>Bold+Italic</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleCode(editor)}>Inline Code</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleBlockquote(editor)}>Quote</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleSetHorizontalRule(editor)}>HR</button>
        <button className={classes.ButtonFunctionDefault} onClick={() => handleToggleTaskList(editor)}>Checkbox</button>*/}
        <ColorInput
          size="xs"
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