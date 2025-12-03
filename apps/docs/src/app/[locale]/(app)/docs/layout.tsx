// Components
import { AiChat } from '@/features/chat/components/ai-chat';
import { Sidebar } from '@/features/docs/components/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid grid-cols-1 gap-3 lg:grid-cols-[210px_1fr_210px]">
      <AiChat />
      <Sidebar />
      {children}
      <div id="toc-container" />
    </div>
  );
}
