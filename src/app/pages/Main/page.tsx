'use client';

import { useState } from 'react';
import MarkdownEditor from '../../components/MarkdownEditor';
import MainViewHeader from '../../components/MainViewHeader';

export default function MainView() {
  const [activeTab, setActiveTab] = useState('Start'); // Standard-Tab

  const handleTabChange = (tab: string | null) => {
    if (tab) setActiveTab(tab); // Ignoriert null
  };

  return (
    <div>
      <MainViewHeader onTabChange={handleTabChange} />
      {activeTab === 'Start' && <MarkdownEditor />}
      {/* Füge weitere Tabs/Komponenten hinzu */}
    </div>
  );
}