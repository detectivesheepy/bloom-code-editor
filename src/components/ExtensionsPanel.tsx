import { Download, Search, Upload } from 'lucide-react';
import { Extension } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExtensionsPanelProps {
  extensions: Extension[];
  onInstall: (extensionId: string) => void;
  onUninstall: (extensionId: string) => void;
}

export const ExtensionsPanel = ({ extensions, onInstall, onUninstall }: ExtensionsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExtensions = extensions.filter(
    (ext) =>
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadExtension = () => {
    toast.success('Upload extension feature coming soon!');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase text-muted-foreground">Extensions</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={handleUploadExtension}
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search extensions..."
            className="pl-8 h-8 bg-muted border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredExtensions.map((ext) => (
          <div key={ext.id} className="border border-border rounded p-3 hover:border-accent transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{ext.name}</h3>
                <p className="text-xs text-muted-foreground">{ext.author}</p>
              </div>
              <Button
                variant={ext.installed ? 'secondary' : 'default'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => ext.installed ? onUninstall(ext.id) : onInstall(ext.id)}
              >
                {ext.installed ? 'Uninstall' : 'Install'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{ext.description}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>v{ext.version}</span>
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {(ext.downloads / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
