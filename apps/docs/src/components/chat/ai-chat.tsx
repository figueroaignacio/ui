'use client';

// Hooks
import { useChat } from '@//hooks/use-chat';
import { useChatInput } from '@//hooks/use-chat-input';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useState, type RefObject } from 'react';

// Components
import { ChatToggleButton } from './chat-toggle-button';
import { ChatWindow } from './chat-window';

export function AiChat() {
  const [open, setOpen] = useState(false);
  const { messages, isLoading, messagesEndRef, sendMessage } = useChat();
  const { message, setMessage, handleSubmit, handleKeyPress } = useChatInput(sendMessage);

  const handleClose = () => setOpen(false);
  useLockBodyScroll(open);

  return (
    <div className="fixed right-3 bottom-20 z-100000 lg:right-8 lg:bottom-8">
      <ChatToggleButton isOpen={open} onClick={() => setOpen(!open)} />
      <ChatWindow
        isOpen={open}
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef as RefObject<HTMLDivElement>}
        message={message}
        onMessageChange={setMessage}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
        onClose={handleClose}
      />
    </div>
  );
}
