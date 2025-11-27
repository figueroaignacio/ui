// Components
import { Sidebar } from '@/components/docs/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid grid-cols-1 gap-3 lg:grid-cols-[210px_1fr_210px]">
      <Sidebar />
      {children}
      <div id="toc-container" />
    </div>
  );
}
