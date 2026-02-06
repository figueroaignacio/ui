import {
  Book,
  Box,
  Download,
  Layers,
  Layout,
  Moon,
  Palette,
  Puzzle,
  Rocket,
  Terminal,
} from 'lucide-react';

export const getIcon = (title: string, href?: string) => {
  const lowerTitle = title.toLowerCase();

  if (['sections', 'secciones'].includes(lowerTitle)) return <Layers className="h-4 w-4" />;
  if (['getting started', 'comenzando'].includes(lowerTitle)) return <Rocket className="h-4 w-4" />;
  if (['components', 'componentes'].includes(lowerTitle)) return <Box className="h-4 w-4" />;

  if (href) {
    if (href.includes('/installation')) return <Download className="h-4 w-4" />;
    if (href.includes('/theming')) return <Palette className="h-4 w-4" />;
    if (href.includes('/dark-mode')) return <Moon className="h-4 w-4" />;
    if (href.includes('/cli')) return <Terminal className="h-4 w-4" />;
    if (href.includes('/docs/components/')) return <Puzzle className="h-4 w-4 opacity-70" />;
    if (href === '/docs') return <Book className="h-4 w-4" />;
  }

  return <Layout className="h-4 w-4 opacity-50" />;
};
