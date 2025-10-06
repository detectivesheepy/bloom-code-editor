import Editor from '@monaco-editor/react';
import { Tab } from '@/types/editor';

interface CodeEditorProps {
  activeTab: Tab | null;
  onContentChange: (path: string, content: string) => void;
}

export const CodeEditor = ({ activeTab, onContentChange }: CodeEditorProps) => {
  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[hsl(var(--editor-bg))]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Code Editor</h2>
          <p className="text-muted-foreground">Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[hsl(var(--editor-bg))]">
      <Editor
        height="100%"
        language={activeTab.language}
        value={activeTab.content}
        theme="vs-dark"
        onChange={(value) => onContentChange(activeTab.path, value || '')}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
          lineNumbers: 'on',
          rulers: [80, 120],
          wordWrap: 'off',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderWhitespace: 'selection',
          tabSize: 2,
        }}
      />
    </div>
  );
};
