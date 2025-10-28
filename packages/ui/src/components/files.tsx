'use client';

import { cn } from '@repo/ui/lib/cn';
import { ChevronRight, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import React from 'react';

// Context para manejar el estado de folders abiertos
interface FilesContextValue {
  openFolders: Set<string>;
  toggleFolder: (path: string) => void;
}

const FilesContext = React.createContext<FilesContextValue | null>(null);

const useFiles = () => {
  const context = React.useContext(FilesContext);
  if (!context) {
    throw new Error('File components must be used within Files');
  }
  return context;
};

// Componente File
export type FileProps = {
  name: string;
  className?: string;
  onClick?: () => void;
};

export const File: React.FC<FileProps> = ({ name, className, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'hover:bg-muted flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm',
      className,
    )}
  >
    <FileIcon className="text-muted-foreground h-4 w-4" />
    <span>{name}</span>
  </div>
);

// Componente Folder
export type FolderProps = {
  name: string;
  children?: React.ReactNode;
  className?: string;
  path?: string; // Path interno para identificar el folder
};

export const Folder: React.FC<FolderProps> = ({
  name,
  children,
  className,
  path: externalPath,
}) => {
  const { openFolders, toggleFolder } = useFiles();
  const parentPath = React.useContext(FolderPathContext);
  const currentPath = externalPath || (parentPath ? `${parentPath}/${name}` : name);
  const isOpen = openFolders.has(currentPath);
  const hasChildren = React.Children.count(children) > 0;

  const handleToggle = () => {
    if (hasChildren) {
      toggleFolder(currentPath);
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleToggle}
        className={cn(
          'hover:bg-muted flex items-center rounded px-2 py-1 text-sm font-medium transition-all',
          hasChildren && 'cursor-pointer',
        )}
      >
        {hasChildren && (
          <ChevronRight
            className={cn(
              'text-muted-foreground mr-1 h-4 w-4 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          />
        )}
        {isOpen ? (
          <FolderOpenIcon className="text-muted-foreground h-4 w-4" />
        ) : (
          <FolderIcon className="text-muted-foreground h-4 w-4" />
        )}
        <span className="ml-2">{name}</span>
      </div>

      {hasChildren && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="border-border mt-1 ml-2 border-l pl-4">
            <FolderPathContext.Provider value={currentPath}>{children}</FolderPathContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
};

// Context para el path del folder padre
const FolderPathContext = React.createContext<string>('');

// Componente Files (container principal)
type FilesProps = {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
};

export const Files: React.FC<FilesProps> = ({ children, defaultValue, className }) => {
  const [openFolders, setOpenFolders] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set();

    // Convertir "src/components" en ["src", "src/components"]
    const paths = defaultValue.split('/');
    const fullPaths = new Set<string>();
    let currentPath = '';

    paths.forEach((segment) => {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      fullPaths.add(currentPath);
    });

    return fullPaths;
  });

  const toggleFolder = React.useCallback((path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ openFolders, toggleFolder }),
    [openFolders, toggleFolder],
  );

  return (
    <FilesContext.Provider value={contextValue}>
      <div className={cn('w-full min-w-[250px]', className)}>{children}</div>
    </FilesContext.Provider>
  );
};
