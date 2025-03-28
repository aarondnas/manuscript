'use client';
import { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface EnhancedLiveMarkdownEditorProps {
  markdown: string;
  onMarkdownChange: (content: string) => void;
}

export default function EnhancedLiveMarkdownEditor({
  markdown = '',
  onMarkdownChange,
}: EnhancedLiveMarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const renderMarkdownToHtml = (md: string) => {
    return md
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current!);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    return preCaretRange.toString().length;
  };

  const restoreCursorPosition = (offset: number) => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    let charCount = 0;

    function setRange(node: ChildNode) {
      if (charCount >= offset) {
        range.setStart(node, 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        return true;
      }
      if (node.nodeType === 3) {
        const nextCharCount = charCount + node.textContent!.length;
        if (nextCharCount >= offset) {
          range.setStart(node, offset - charCount);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
          return true;
        }
        charCount = nextCharCount;
      }
      return false;
    }

    function traverseNodes(nodes: NodeListOf<ChildNode>) {
      for (let i = 0; i < nodes.length; i++) {
        if (setRange(nodes[i])) return;
        if (nodes[i].childNodes.length) {
          traverseNodes(nodes[i].childNodes);
        }
      }
    }

    traverseNodes(editorRef.current.childNodes);
  };

  useEffect(() => {
    const savedOffset = saveCursorPosition();
    if (editorRef.current) {
      editorRef.current.innerHTML = renderMarkdownToHtml(markdown);
    }
    restoreCursorPosition(savedOffset);
  }, [markdown]);



  const updateContent = () => {
    if (!editorRef.current) return;
    onMarkdownChange(editorRef.current.innerText);
  };

  const handleInput = () => {
    updateContent();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Markdown Editor
      </Typography>

      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        
      />
    </Box>
  );
}
