export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    border: string;
    editorBg: string;
    sidebarBg: string;
    activitybarBg: string;
    statusbarBg: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark (Default)',
    colors: {
      background: '0 0% 11.8%',
      foreground: '0 0% 83.1%',
      primary: '210 100% 50%',
      secondary: '0 0% 18%',
      muted: '0 0% 18%',
      accent: '210 100% 50%',
      border: '0 0% 23.5%',
      editorBg: '0 0% 11.8%',
      sidebarBg: '0 0% 14.5%',
      activitybarBg: '0 0% 19.6%',
      statusbarBg: '210 100% 50%',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    colors: {
      background: '60 1% 16%',
      foreground: '60 30% 96%',
      primary: '80 76% 53%',
      secondary: '60 2% 22%',
      muted: '60 2% 22%',
      accent: '326 100% 74%',
      border: '60 2% 28%',
      editorBg: '60 1% 16%',
      sidebarBg: '60 2% 19%',
      activitybarBg: '60 2% 24%',
      statusbarBg: '326 100% 74%',
    },
  },
  {
    id: 'github',
    name: 'GitHub Light',
    colors: {
      background: '0 0% 100%',
      foreground: '220 14% 11%',
      primary: '212 92% 43%',
      secondary: '210 17% 98%',
      muted: '210 17% 98%',
      accent: '212 92% 43%',
      border: '214 32% 91%',
      editorBg: '0 0% 100%',
      sidebarBg: '210 17% 98%',
      activitybarBg: '214 32% 91%',
      statusbarBg: '212 92% 43%',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      background: '231 15% 18%',
      foreground: '60 30% 96%',
      primary: '326 100% 74%',
      secondary: '232 14% 31%',
      muted: '232 14% 31%',
      accent: '265 89% 78%',
      border: '233 14% 35%',
      editorBg: '231 15% 18%',
      sidebarBg: '232 14% 25%',
      activitybarBg: '233 14% 31%',
      statusbarBg: '265 89% 78%',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    colors: {
      background: '220 16% 22%',
      foreground: '218 27% 94%',
      primary: '193 43% 67%',
      secondary: '220 17% 32%',
      muted: '220 17% 32%',
      accent: '179 25% 65%',
      border: '220 16% 36%',
      editorBg: '220 16% 22%',
      sidebarBg: '220 17% 26%',
      activitybarBg: '220 17% 32%',
      statusbarBg: '193 43% 67%',
    },
  },
  {
    id: 'solarized',
    name: 'Solarized Dark',
    colors: {
      background: '192 100% 11%',
      foreground: '44 87% 94%',
      primary: '205 69% 49%',
      secondary: '192 81% 14%',
      muted: '192 81% 14%',
      accent: '68 100% 30%',
      border: '194 25% 20%',
      editorBg: '192 100% 11%',
      sidebarBg: '193 100% 13%',
      activitybarBg: '192 81% 14%',
      statusbarBg: '205 69% 49%',
    },
  },
];

export const monacoThemeMap: { [key: string]: string } = {
  dark: 'vs-dark',
  monokai: 'vs-dark',
  github: 'vs',
  dracula: 'vs-dark',
  nord: 'vs-dark',
  solarized: 'vs-dark',
};
