'use client';

// Hooks
import { useChat } from '@//hooks/use-chat';
import { useChatInput } from '@//hooks/use-chat-input';
import { useState, type RefObject } from 'react';

// Components
import { ChatToggleButton } from './chat-toggle-button';
import { ChatWindow } from './chat-window';

export function AiChat() {
  const [open, setOpen] = useState(false);
  const { messages, isLoading, messagesEndRef, sendMessage } = useChat();
  const { message, setMessage, handleSubmit, handleKeyPress } = useChatInput(sendMessage);

  const handleClose = () => setOpen(false);

  return (
    <div className="fixed right-8 bottom-8 z-100000">
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
