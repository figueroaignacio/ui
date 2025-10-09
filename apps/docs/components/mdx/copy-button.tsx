'use client';

// Hooks
import React, { useState } from 'react';

// Components
import { Button } from '@repo/ui/components/button';

// Icons
import { CheckIcon, ClipboardIcon } from '@radix-ui/react-icons';

export const CopyButton = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    const sourceCode = extractSourceCode(children);
    await navigator.clipboard.writeText(sourceCode);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const extractSourceCode = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(extractSourceCode).join('');
    }
    if (React.isValidElement(node)) {
      const { props } = node;
      const children = React.Children.map(
        // @ts-ignore
        props.children,
        extractSourceCode,
      )?.join('');
      return `${children}`;
    }
    return '';
  };

  return (
    <Button
      disabled={isCopied}
      onClick={copy}
      variant="link"
      size="icon"
      className="cursor-pointer"
    >
      {isCopied ? (
        <CheckIcon className="size-4 text-white" />
      ) : (
        <ClipboardIcon className="text-foreground size-4" />
      )}
    </Button>
  );
};
