import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Type a command or search...',
  inputRef,
}: SearchInputProps) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-xl border px-9 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Search documentation"
      />
      {value && (
        <button
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2 h-4 w-4 cursor-pointer"
          aria-label="Clear search"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
