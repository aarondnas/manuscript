'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TextField, Box, Paper, Typography } from '@mui/material';

interface MarkdownEditorProps {
  markdown: string;
  onMarkdownChange: (value: string) => void;
}

export default function MarkdownEditor({ markdown, onMarkdownChange }: MarkdownEditorProps) {
  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      {/* Textfeld für die Markdown-Eingabe */}
      <Paper sx={{ width: '50%', padding: '20px' }}>
        <TextField
          multiline
          fullWidth
          minRows={20}
          value={markdown}
          onChange={(e) => onMarkdownChange(e.target.value)}
          placeholder="Schreibe dein Markdown hier..."
        />
      </Paper>

      {/* Bereich für das gerenderte Markdown */}
      <Paper sx={{ width: '50%', padding: '20px', overflowY: 'auto' }}>
        <Typography variant="h6">Vorschau:</Typography>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </Paper>
    </Box>
  );
}