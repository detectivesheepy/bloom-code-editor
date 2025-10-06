export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export interface Tab {
  path: string;
  name: string;
  content: string;
  language: string;
}

export interface Extension {
  id: string;
  name: string;
  author: string;
  description: string;
  version: string;
  downloads: number;
  installed: boolean;
}

export interface GitStatus {
  branch: string;
  changes: number;
  commits: { message: string; author: string; date: string }[];
}
