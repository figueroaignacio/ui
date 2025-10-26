import { Sidebar } from '@/components/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[210px_1fr_210px]">
      <div>
        <Sidebar />
      </div>
      {children}
      <div id="toc-container" />
    </div>
  );
}
