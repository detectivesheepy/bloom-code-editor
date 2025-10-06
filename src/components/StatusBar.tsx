import { GitBranch, AlertCircle, CheckCircle } from 'lucide-react';

interface StatusBarProps {
  branch: string;
  lineNumber: number;
  columnNumber: number;
  language: string;
}

export const StatusBar = ({ branch, lineNumber, columnNumber, language }: StatusBarProps) => {
  return (
    <div className="h-6 bg-[hsl(var(--statusbar-bg))] text-[hsl(var(--accent-foreground))] flex items-center justify-between px-3 text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch className="h-3 w-3" />
          <span>{branch}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>No errors</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>Ln {lineNumber}, Col {columnNumber}</span>
        <span>{language.toUpperCase()}</span>
      </div>
    </div>
  );
};
