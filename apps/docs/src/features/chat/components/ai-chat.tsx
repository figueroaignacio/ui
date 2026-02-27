'use client';

import { useChat } from '@/features/chat/hooks/use-chat';
import { useChatInput } from '@/features/chat/hooks/use-chat-input';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useCallback, useEffect, type RefObject } from 'react';
import { useChatContext } from '../context/chat-context';
import { ChatToggleButton } from './chat-toggle-button';
import { ChatWindow } from './chat-window';

export function AiChat() {
  const { isOpen, setIsOpen, setExternalSendMessage } = useChatContext();
  const { messages, isLoading, isStreaming, messagesEndRef, sendMessage, handleSuggestionClick } =
    useChat();
  const { message, setMessage, handleSubmit, handleKeyPress } = useChatInput(sendMessage);

  useEffect(() => {
    setExternalSendMessage(sendMessage);
  }, [sendMessage, setExternalSendMessage]);

  const handleClose = () => setIsOpen(false);
  useLockBodyScroll(isOpen);

  const handleSuggestionClickWrapper = useCallback(
    (text: string) => {
      handleSuggestionClick(text);
      setMessage('');
    },
    [handleSuggestionClick, setMessage],
  );

  return (
    <div className="fixed right-6 bottom-6 z-100000 lg:right-8 lg:bottom-8">
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
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
