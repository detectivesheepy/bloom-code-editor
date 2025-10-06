import { useState } from 'react';
import { ActivityBar } from '@/components/ActivityBar';
import { Sidebar } from '@/components/Sidebar';
import { EditorTabs } from '@/components/EditorTabs';
import { CodeEditor } from '@/components/CodeEditor';
import { StatusBar } from '@/components/StatusBar';
import { starterProject, mockExtensions, mockGitStatus } from '@/data/starterProject';
import { FileNode, Tab, Extension } from '@/types/editor';
import { toast } from 'sonner';

const getLanguageFromPath = (path: string): string => {
  const ext = path.split('.').pop()?.toLowerCase();
  const languageMap: { [key: string]: string } = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    json: 'json',
    md: 'markdown',
    css: 'css',
    html: 'html',
  };
  return languageMap[ext || ''] || 'plaintext';
};

const Index = () => {
  const [activeView, setActiveView] = useState<'files' | 'git' | 'extensions' | 'search' | 'settings'>('files');
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [extensions, setExtensions] = useState<Extension[]>(mockExtensions);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file' && file.content) {
      const existingTab = tabs.find((tab) => tab.path === file.path);
      if (!existingTab) {
        const newTab: Tab = {
          path: file.path,
          name: file.name,
          content: file.content,
          language: getLanguageFromPath(file.path),
        };
        setTabs([...tabs, newTab]);
      }
      setActiveTab(file.path);
    }
  };

  const handleTabClose = (path: string) => {
    const newTabs = tabs.filter((tab) => tab.path !== path);
    setTabs(newTabs);
    if (activeTab === path) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1].path : null);
    }
  };

  const handleContentChange = (path: string, content: string) => {
    setTabs(tabs.map((tab) => (tab.path === path ? { ...tab, content } : tab)));
  };

  const handleInstallExtension = (extensionId: string) => {
    setExtensions(
      extensions.map((ext) =>
        ext.id === extensionId ? { ...ext, installed: true } : ext
      )
    );
    const ext = extensions.find((e) => e.id === extensionId);
    toast.success(`${ext?.name} installed successfully!`);
  };

  const handleUninstallExtension = (extensionId: string) => {
    setExtensions(
      extensions.map((ext) =>
        ext.id === extensionId ? { ...ext, installed: false } : ext
      )
    );
    const ext = extensions.find((e) => e.id === extensionId);
    toast.success(`${ext?.name} uninstalled successfully!`);
  };

  const currentTab = tabs.find((tab) => tab.path === activeTab);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />
        <Sidebar
          activeView={activeView}
          files={starterProject}
          gitStatus={mockGitStatus}
          extensions={extensions}
          onFileSelect={handleFileSelect}
          selectedFile={activeTab}
          onInstallExtension={handleInstallExtension}
          onUninstallExtension={handleUninstallExtension}
        />
        <div className="flex-1 flex flex-col">
          <EditorTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabSelect={setActiveTab}
            onTabClose={handleTabClose}
          />
          <CodeEditor activeTab={currentTab || null} onContentChange={handleContentChange} />
        </div>
      </div>
      <StatusBar
        branch={mockGitStatus.branch}
        lineNumber={1}
        columnNumber={1}
        language={currentTab?.language || 'plaintext'}
      />
    </div>
  );
};

export default Index;
