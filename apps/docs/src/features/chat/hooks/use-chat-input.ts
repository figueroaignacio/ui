import { useState } from 'react';

export function useChatInput(onSubmit: (message: string) => void) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    message,
    setMessage,
    handleSubmit,
    handleKeyPress,
  };
}
