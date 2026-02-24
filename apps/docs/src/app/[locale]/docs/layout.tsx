import { AiChat } from '@/features/chat/components/ai-chat';
import { ChatProvider } from '@/features/chat/context/chat-context';
import { Sidebar } from '@/features/docs/components/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <AiChat />
      <div className="relative grid grid-cols-1 gap-3 lg:grid-cols-[260px_1fr_210px]">
        <Sidebar />
        {children}
        <div id="toc-container" />
      </div>
    </ChatProvider>
  );
}
