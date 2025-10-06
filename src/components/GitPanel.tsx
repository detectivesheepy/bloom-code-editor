import { GitBranch, GitCommit, RefreshCw } from 'lucide-react';
import { GitStatus } from '@/types/editor';
import { Button } from '@/components/ui/button';

interface GitPanelProps {
  gitStatus: GitStatus;
}

export const GitPanel = ({ gitStatus }: GitPanelProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Source Control</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" title="Refresh">
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">{gitStatus.branch}</span>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">
            Changes ({gitStatus.changes})
          </div>
          <div className="text-sm text-muted-foreground">
            {gitStatus.changes} file(s) modified
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
            <GitCommit className="h-3 w-3" />
            Recent Commits
          </div>
          <div className="space-y-2">
            {gitStatus.commits.map((commit, index) => (
              <div key={index} className="text-sm border-l-2 border-accent pl-3 py-1">
                <div className="font-medium">{commit.message}</div>
                <div className="text-xs text-muted-foreground">
                  {commit.author} • {commit.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Commit Changes
        </Button>
      </div>
    </div>
  );
};
