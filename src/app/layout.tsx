'use client';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <html lang="en">
        <body>
          <MantineProvider 
            defaultColorScheme='dark'
            theme={{
              components: {
                Button: {
                  defaultProps: {
                    size: 'xs',
                  },
                },
              },
            }}
          >
          {children}
          </MantineProvider>
        </body>
      </html>
  );
}
