import { GitBranch, CheckCircle } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';

interface StatusBarProps {
  branch: string;
  lineNumber: number;
  columnNumber: number;
  language: string;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export const StatusBar = ({ branch, lineNumber, columnNumber, language, currentTheme, onThemeChange }: StatusBarProps) => {
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
        <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
        <span>Ln {lineNumber}, Col {columnNumber}</span>
        <span>{language.toUpperCase()}</span>
      </div>
    </div>
  );
};
