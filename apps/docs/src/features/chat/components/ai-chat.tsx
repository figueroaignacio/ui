'use client';

// Hooks
import { useChat } from '@/features/chat/hooks/use-chat';
import { useChatInput } from '@/features/chat/hooks/use-chat-input';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useState, type RefObject } from 'react';

// Components
import { ChatToggleButton } from './chat-toggle-button';
import { ChatWindow } from './chat-window';

export function AiChat() {
  const [open, setOpen] = useState(false);
  const { messages, isLoading, messagesEndRef, sendMessage, handleSuggestionClick } = useChat();
  const { message, setMessage, handleSubmit, handleKeyPress } = useChatInput(sendMessage);

  const handleClose = () => setOpen(false);
  useLockBodyScroll(open);

  const handleSuggestionClickWrapper = (text: string) => {
    handleSuggestionClick(text);
    setMessage('');
  };

  return (
    <div className="fixed right-6 bottom-6 z-100000 lg:right-8 lg:bottom-8">
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
        onSuggestionClick={handleSuggestionClickWrapper}
      />
    </div>
  );
}
