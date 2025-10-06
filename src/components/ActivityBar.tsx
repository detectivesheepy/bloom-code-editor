import { Files, GitBranch, Package, Search, Settings, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityBarProps {
  activeView: 'files' | 'git' | 'extensions' | 'search' | 'settings' | 'terminal';
  onViewChange: (view: 'files' | 'git' | 'extensions' | 'search' | 'settings' | 'terminal') => void;
}

export const ActivityBar = ({ activeView, onViewChange }: ActivityBarProps) => {
  const items = [
    { id: 'files' as const, icon: Files, label: 'Explorer' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
    { id: 'terminal' as const, icon: Terminal, label: 'Terminal' },
    { id: 'extensions' as const, icon: Package, label: 'Extensions' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-12 bg-[hsl(var(--activitybar-bg))] flex flex-col items-center py-4 gap-4 border-r border-border">
      {items.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="icon"
          className={`w-10 h-10 ${
            activeView === item.id
              ? 'bg-muted text-accent-foreground border-l-2 border-accent rounded-none'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => onViewChange(item.id)}
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
};
