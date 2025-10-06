import { Terminal as TerminalIcon, X, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success';
  text: string;
}

interface TerminalProps {
  onFileCreate?: (path: string, content: string) => void;
  onFileDelete?: (path: string) => void;
}

export const Terminal = ({ onFileCreate, onFileDelete }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'BloomVisual Code Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setLines((prev) => [...prev, { type: 'command', text: `$ ${trimmedCmd}` }]);
    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        setLines((prev) => [
          ...prev,
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  help              - Show this help message' },
          { type: 'output', text: '  clear             - Clear terminal' },
          { type: 'output', text: '  ls                - List files and directories' },
          { type: 'output', text: '  pwd               - Print working directory' },
          { type: 'output', text: '  echo <text>       - Echo text to terminal' },
          { type: 'output', text: '  touch <file>      - Create a new file' },
          { type: 'output', text: '  mkdir <dir>       - Create a new directory' },
          { type: 'output', text: '  rm <file>         - Remove a file' },
          { type: 'output', text: '  cat <file>        - Display file contents' },
          { type: 'output', text: '  npm install <pkg> - Install npm package' },
          { type: 'output', text: '  npm run <script>  - Run npm script' },
          { type: 'output', text: '  git status        - Show git status' },
          { type: 'output', text: '  git commit -m     - Commit changes' },
          { type: 'output', text: '  node <file>       - Run JavaScript file' },
        ]);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'ls':
        setLines((prev) => [
          ...prev,
          { type: 'output', text: 'src/' },
          { type: 'output', text: 'package.json' },
          { type: 'output', text: 'README.md' },
          { type: 'output', text: '.gitignore' },
        ]);
        break;

      case 'pwd':
        setLines((prev) => [...prev, { type: 'output', text: '/home/user/my-project' }]);
        break;

      case 'echo':
        setLines((prev) => [...prev, { type: 'output', text: args.join(' ') }]);
        break;

      case 'touch':
        if (args.length === 0) {
          setLines((prev) => [...prev, { type: 'error', text: 'Error: No filename specified' }]);
        } else {
          const filename = args[0];
          setLines((prev) => [...prev, { type: 'success', text: `Created file: ${filename}` }]);
          onFileCreate?.(filename, '');
          toast.success(`File created: ${filename}`);
        }
        break;

      case 'mkdir':
        if (args.length === 0) {
          setLines((prev) => [...prev, { type: 'error', text: 'Error: No directory name specified' }]);
        } else {
          setLines((prev) => [...prev, { type: 'success', text: `Created directory: ${args[0]}` }]);
          toast.success(`Directory created: ${args[0]}`);
        }
        break;

      case 'rm':
        if (args.length === 0) {
          setLines((prev) => [...prev, { type: 'error', text: 'Error: No file specified' }]);
        } else {
          setLines((prev) => [...prev, { type: 'success', text: `Removed: ${args[0]}` }]);
          onFileDelete?.(args[0]);
          toast.success(`Removed: ${args[0]}`);
        }
        break;

      case 'cat':
        if (args.length === 0) {
          setLines((prev) => [...prev, { type: 'error', text: 'Error: No file specified' }]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: 'output', text: `// Contents of ${args[0]}` },
            { type: 'output', text: 'console.log("Hello, World!");' },
          ]);
        }
        break;

      case 'npm':
        if (args[0] === 'install') {
          const pkg = args[1] || 'dependencies';
          setLines((prev) => [
            ...prev,
            { type: 'output', text: `Installing ${pkg}...` },
            { type: 'success', text: `✓ ${pkg} installed successfully` },
          ]);
          toast.success(`Package installed: ${pkg}`);
        } else if (args[0] === 'run') {
          const script = args[1] || 'start';
          setLines((prev) => [
            ...prev,
            { type: 'output', text: `Running script: ${script}...` },
            { type: 'success', text: `✓ Script completed successfully` },
          ]);
        } else {
          setLines((prev) => [...prev, { type: 'error', text: 'Unknown npm command. Try: npm install or npm run' }]);
        }
        break;

      case 'git':
        if (args[0] === 'status') {
          setLines((prev) => [
            ...prev,
            { type: 'output', text: 'On branch main' },
            { type: 'output', text: 'Your branch is up to date with "origin/main".' },
            { type: 'output', text: '' },
            { type: 'output', text: 'Changes not staged for commit:' },
            { type: 'output', text: '  modified:   src/index.ts' },
          ]);
        } else if (args[0] === 'commit') {
          setLines((prev) => [
            ...prev,
            { type: 'success', text: `✓ Committed: ${args.slice(2).join(' ') || 'Update files'}` },
          ]);
          toast.success('Changes committed');
        } else {
          setLines((prev) => [...prev, { type: 'error', text: 'Unknown git command. Try: git status or git commit -m' }]);
        }
        break;

      case 'node':
        if (args.length === 0) {
          setLines((prev) => [...prev, { type: 'error', text: 'Error: No file specified' }]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: 'output', text: `Running ${args[0]}...` },
            { type: 'output', text: 'Hello, World!' },
            { type: 'success', text: '✓ Execution completed' },
          ]);
        }
        break;

      default:
        setLines((prev) => [
          ...prev,
          { type: 'error', text: `Command not found: ${command}. Type "help" for available commands.` },
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const clearTerminal = () => {
    setLines([
      { type: 'output', text: 'BloomVisual Code Terminal v1.0.0' },
      { type: 'output', text: 'Type "help" for available commands' },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold uppercase text-muted-foreground">Terminal</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearTerminal} title="Clear Terminal">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 bg-background/50">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${
              line.type === 'command'
                ? 'text-accent font-semibold'
                : line.type === 'error'
                ? 'text-destructive'
                : line.type === 'success'
                ? 'text-green-500'
                : 'text-foreground'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-2">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono text-sm">$</span>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background border-border font-mono text-sm"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};
