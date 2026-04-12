import { Cancel01Icon, Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  onKeyDown,
  placeholder = 'Type a command or search...',
  inputRef,
}: SearchInputProps) {
  return (
    <div className="border-border/50 flex items-center border-b px-3">
      <HugeiconsIcon icon={Search02Icon} className="text-muted-foreground h-5 w-5 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="text-foreground placeholder:text-muted-foreground flex h-14 w-full bg-transparent px-3 py-3 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Search documentation"
      />
      {value && (
        <button
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center"
          aria-label="Clear search"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
