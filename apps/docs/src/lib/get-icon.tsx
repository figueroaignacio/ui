import {
  BookOpen01Icon,
  CodeCircleIcon,
  Download01Icon,
  Layers01Icon,
  Layout01Icon,
  Moon02Icon,
  PackageIcon,
  PaintBoardIcon,
  PuzzleIcon,
  Rocket01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export const getIcon = (title: string, href?: string) => {
  const lowerTitle = title.toLowerCase();

  if (['sections', 'secciones'].includes(lowerTitle))
    return <HugeiconsIcon icon={Layers01Icon} size={16} />;
  if (['getting started', 'comenzando'].includes(lowerTitle))
    return <HugeiconsIcon icon={Rocket01Icon} size={16} />;
  if (['components', 'componentes'].includes(lowerTitle))
    return <HugeiconsIcon icon={PackageIcon} size={16} />;

  if (href) {
    if (href.includes('/installation')) return <HugeiconsIcon icon={Download01Icon} size={16} />;
    if (href.includes('/theming')) return <HugeiconsIcon icon={PaintBoardIcon} size={16} />;
    if (href.includes('/dark-mode')) return <HugeiconsIcon icon={Moon02Icon} size={16} />;
    if (href.includes('/cli')) return <HugeiconsIcon icon={CodeCircleIcon} size={16} />;
    if (href.includes('/docs/components/'))
      return <HugeiconsIcon icon={PuzzleIcon} size={16} className="opacity-70" />;
    if (href === '/docs') return <HugeiconsIcon icon={BookOpen01Icon} size={16} />;
  }

  return <HugeiconsIcon icon={Layout01Icon} size={16} className="opacity-50" />;
};
