import { X } from 'lucide-react';
import { Tab } from '@/types/editor';
import { Button } from '@/components/ui/button';

interface EditorTabsProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
}

export const EditorTabs = ({ tabs, activeTab, onTabSelect, onTabClose }: EditorTabsProps) => {
  return (
    <div className="flex items-center bg-[hsl(var(--tab-inactive-bg))] border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`flex items-center gap-2 px-4 py-2 border-r border-border cursor-pointer group ${
            activeTab === tab.path
              ? 'bg-[hsl(var(--tab-active-bg))] text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => onTabSelect(tab.path)}
        >
          <span className="text-sm whitespace-nowrap">{tab.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-muted opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.path);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};
