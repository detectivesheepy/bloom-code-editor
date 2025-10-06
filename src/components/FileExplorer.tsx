import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Plus, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { FileNode } from '@/types/editor';
import { Button } from '@/components/ui/button';

interface FileExplorerProps {
  files: FileNode;
  onFileSelect: (file: FileNode) => void;
  selectedFile: string | null;
}

export const FileExplorer = ({ files, onFileSelect, selectedFile }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['my-project', 'my-project/src'])
  );

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode, level = 0): JSX.Element => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <div
            className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-muted ${
              isSelected ? 'bg-muted' : ''
            }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => toggleFolder(node.path)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            {isExpanded ? (
              <FolderOpen className="h-4 w-4 text-accent" />
            ) : (
              <Folder className="h-4 w-4 text-accent" />
            )}
            <span className="text-sm">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>{node.children.map((child) => renderNode(child, level + 1))}</div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-muted ${
          isSelected ? 'bg-muted' : ''
        }`}
        style={{ paddingLeft: `${level * 12 + 24}px` }}
        onClick={() => onFileSelect(node)}
      >
        <File className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Explorer</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" title="New File">
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" title="Refresh">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="py-2">{renderNode(files)}</div>
    </div>
  );
};
