import { FileNode } from '@/types/editor';

export const starterProject: FileNode = {
  name: 'my-project',
  path: 'my-project',
  type: 'folder',
  children: [
    {
      name: 'src',
      path: 'my-project/src',
      type: 'folder',
      children: [
        {
          name: 'index.ts',
          path: 'my-project/src/index.ts',
          type: 'file',
          content: `// Welcome to Code Editor!
// This is a lightweight code editor inspired by VS Code

console.log('Hello, World!');

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('Developer');
console.log(message);

export { greet };
`
        },
        {
          name: 'utils.ts',
          path: 'my-project/src/utils.ts',
          type: 'file',
          content: `export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const constants = {
  APP_NAME: 'Code Editor',
  VERSION: '1.0.0'
};
`
        }
      ]
    },
    {
      name: 'package.json',
      path: 'my-project/package.json',
      type: 'file',
      content: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project for Code Editor",
  "main": "src/index.ts",
  "scripts": {
    "start": "node src/index.ts",
    "build": "tsc"
  },
  "keywords": ["typescript", "starter"],
  "author": "You",
  "license": "MIT"
}
`
    },
    {
      name: 'README.md',
      path: 'my-project/README.md',
      type: 'file',
      content: `# My Project

Welcome to your starter project!

## Features

- TypeScript support
- Modern development setup
- Ready to customize

## Getting Started

1. Explore the files in the \`src\` folder
2. Edit \`index.ts\` to see changes
3. Create new files and folders as needed

## Extensions

Try installing extensions from the Extensions panel to enhance your coding experience!

Happy coding! 🚀
`
    },
    {
      name: '.gitignore',
      path: 'my-project/.gitignore',
      type: 'file',
      content: `node_modules/
dist/
*.log
.env
.DS_Store
`
    }
  ]
};

export const mockExtensions = [
  {
    id: 'prettier',
    name: 'Prettier - Code formatter',
    author: 'Prettier',
    description: 'Code formatter using prettier',
    version: '9.10.4',
    downloads: 25000000,
    installed: true
  },
  {
    id: 'eslint',
    name: 'ESLint',
    author: 'Microsoft',
    description: 'Integrates ESLint JavaScript into VS Code',
    version: '2.4.0',
    downloads: 18000000,
    installed: true
  },
  {
    id: 'gitlens',
    name: 'GitLens',
    author: 'GitKraken',
    description: 'Supercharge Git within your editor',
    version: '14.1.0',
    downloads: 15000000,
    installed: false
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    author: 'GitHub',
    description: 'Your AI pair programmer',
    version: '1.95.0',
    downloads: 12000000,
    installed: false
  },
  {
    id: 'live-server',
    name: 'Live Server',
    author: 'Ritwick Dey',
    description: 'Launch a development local Server with live reload',
    version: '5.7.9',
    downloads: 20000000,
    installed: false
  },
  {
    id: 'todo-highlight',
    name: 'TODO Highlight',
    author: 'Wayou Liu',
    description: 'Highlight TODOs, FIXMEs, and any keywords',
    version: '1.0.5',
    downloads: 3000000,
    installed: false
  }
];

export const mockGitStatus = {
  branch: 'main',
  changes: 3,
  commits: [
    {
      message: 'Initial commit',
      author: 'You',
      date: '2025-10-06'
    },
    {
      message: 'Add starter files',
      author: 'You',
      date: '2025-10-06'
    },
    {
      message: 'Update README',
      author: 'You',
      date: '2025-10-06'
    }
  ]
};
