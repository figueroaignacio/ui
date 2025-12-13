// lib/get-icon.tsx
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

  // 1. Detección por Título (Español e Inglés)
  if (['sections', 'secciones'].includes(lowerTitle)) return <Layers className="h-4 w-4" />;
  if (['getting started', 'comenzando'].includes(lowerTitle)) return <Rocket className="h-4 w-4" />;
  if (['components', 'componentes'].includes(lowerTitle)) return <Box className="h-4 w-4" />;

  // 2. Detección por Ruta (HREF)
  if (href) {
    if (href.includes('/installation')) return <Download className="h-4 w-4" />;
    if (href.includes('/theming')) return <Palette className="h-4 w-4" />;
    if (href.includes('/dark-mode')) return <Moon className="h-4 w-4" />;
    if (href.includes('/cli')) return <Terminal className="h-4 w-4" />;

    // Componentes individuales
    if (href.includes('/docs/components/')) return <Puzzle className="h-4 w-4 opacity-70" />;

    // Root docs
    if (href === '/docs') return <Book className="h-4 w-4" />;
  }

  // Fallback
  return <Layout className="h-4 w-4 opacity-50" />;
};
