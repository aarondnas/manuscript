'use client';

import MainView from './pages/Main/page.tsx'
import { MantineProvider } from '@mantine/core';

export default function Home() {
    return (
      <MantineProvider defaultColorScheme={'dark'}>
        <MainView/>
      </MantineProvider>
    );
  }