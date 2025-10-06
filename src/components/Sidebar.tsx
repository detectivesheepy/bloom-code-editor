import { FileNode, Extension, GitStatus } from '@/types/editor';
import { FileExplorer } from './FileExplorer';
import { GitPanel } from './GitPanel';
import { ExtensionsPanel } from './ExtensionsPanel';
import { Terminal } from './Terminal';

interface SidebarProps {
  activeView: 'files' | 'git' | 'extensions' | 'search' | 'settings' | 'terminal';
  files: FileNode;
  gitStatus: GitStatus;
  extensions: Extension[];
  onFileSelect: (file: FileNode) => void;
  selectedFile: string | null;
  onInstallExtension: (extensionId: string) => void;
  onUninstallExtension: (extensionId: string) => void;
  onFileCreate?: (path: string, content: string) => void;
  onFileDelete?: (path: string) => void;
}

export const Sidebar = ({
  activeView,
  files,
  gitStatus,
  extensions,
  onFileSelect,
  selectedFile,
  onInstallExtension,
  onUninstallExtension,
  onFileCreate,
  onFileDelete,
}: SidebarProps) => {
  const renderContent = () => {
    switch (activeView) {
      case 'files':
        return <FileExplorer files={files} onFileSelect={onFileSelect} selectedFile={selectedFile} />;
      case 'git':
        return <GitPanel gitStatus={gitStatus} />;
      case 'extensions':
        return (
          <ExtensionsPanel
            extensions={extensions}
            onInstall={onInstallExtension}
            onUninstall={onUninstallExtension}
          />
        );
      case 'terminal':
        return <Terminal onFileCreate={onFileCreate} onFileDelete={onFileDelete} />;
      case 'search':
        return (
          <div className="p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Search</div>
            <p className="text-sm text-muted-foreground">Search functionality coming soon!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">Settings</div>
            <p className="text-sm text-muted-foreground">Settings panel coming soon!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-[hsl(var(--sidebar-bg))] border-r border-border flex flex-col">
      {renderContent()}
    </div>
  );
};
