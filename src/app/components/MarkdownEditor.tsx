'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button, TextField, Box, Paper, Typography } from '@mui/material';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('');

  // Funktion, um Text als Überschrift zu formatieren
  const formatAsHeading = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      const newText = `# ${selectedText}`;
      setMarkdown(markdown.replace(selectedText, newText));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Textfeld für die Markdown-Eingabe */}
      <Paper sx={{ width: '50%', padding: '20px' }}>
        <TextField
          multiline
          fullWidth
          minRows={20}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Schreibe dein Markdown hier..."
        />
        <Button variant="contained" onClick={formatAsHeading} sx={{ mt: 2 }}>
          Als Überschrift formatieren
        </Button>
      </Paper>

      {/* Bereich für das gerenderte Markdown */}
      <Paper sx={{ width: '50%', padding: '20px', overflowY: 'auto' }}>
        <Typography variant="h6">Vorschau:</Typography>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </Paper>
    </Box>
  );
}