'use client';

import { useChatInput } from '@/features/chat/hooks/use-chat-input';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useCallback, type RefObject } from 'react';
import { useChatContext } from '../context/chat-context';
import { ChatToggleButton } from './chat-toggle-button';
import { ChatWindow } from './chat-window';

export function AiChat() {
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    isStreaming,
    error,
    messagesEndRef,
    sendMessage,
    handleSuggestionClick,
  } = useChatContext();
  const { message, setMessage, handleSubmit, handleKeyPress } = useChatInput(sendMessage);

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
    <div>
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
        error={error}
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

/*
  isLoading:   (-.-)  "thinking..."
  isStreaming: (°ロ°) "I AM BECOM—"
  isDone:      (¬‿¬) "as I was saying,"
  
  isError:     (._.)
               // TODO: handle gracefully
               // current handling: ¯\_(ツ)_/¯
*/
