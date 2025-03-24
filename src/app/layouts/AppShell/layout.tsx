'use client'

import { MantineProvider, NavLink, Menu, Button, AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css'; // oder eine andere Import-Methode, falls du Mantine anders integrierst
import MantineNextLink from '../../components/MantineNextLink.tsx'; // Importiere deinen Wrapper


export default function AppShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme={'dark'}>
          <AppShell
            header={{ height: '2em' }}
            navbar={{ width: '16em', breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
          >
            <AppShell.Header>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

              <Menu>
                <Menu.Target>
                  <Button>File</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Settings</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <Button>Edit</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Edit 1</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <Button>View</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>View 1</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <Button>Help</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Help 1</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <NavLink label="Playlist Pug" component={MantineNextLink} href="/pages/PlaylistPug" />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}