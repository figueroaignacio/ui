// Components
import { BgBlur } from '@/components/bg-blur';
import { Sidebar } from '@/components/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid grid-cols-1 gap-3 lg:grid-cols-[210px_1fr_210px]">
      <BgBlur />
      <div>
        <Sidebar />
      </div>
      {children}
      <div id="toc-container" />
    </div>
  );
}
