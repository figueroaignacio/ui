'use client';

import { ChevronRight, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { cn } from '../lib/cn';

export type GitStatus = 'modified' | 'deleted' | 'added' | 'untracked' | 'renamed' | 'ignored';

const gitStatusStyles: Record<GitStatus, { color: string; letter: string }> = {
  modified: { color: 'text-yellow-500', letter: 'M' },
  deleted: { color: 'text-red-500 line-through opacity-70', letter: 'D' },
  added: { color: 'text-green-500', letter: 'A' },
  untracked: { color: 'text-green-500', letter: 'U' },
  renamed: { color: 'text-blue-500', letter: 'R' },
  ignored: { color: 'text-muted-foreground opacity-50', letter: 'I' },
};

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

const FolderPathContext = React.createContext<string>('');

export type FileProps = {
  name: string;
  className?: string;
  onClick?: () => void;
  status?: GitStatus;
};

export const File: React.FC<FileProps> = ({ name, className, onClick, status }) => {
  const statusConfig = status ? gitStatusStyles[status] : undefined;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 4, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors',
        className,
      )}
    >
      <span className={cn('text-muted-foreground', statusConfig?.color)}>
        <FileIcon className="size-4" />
      </span>

      <span className={cn('flex-1 truncate', statusConfig?.color)}>{name}</span>

      {statusConfig && (
        <span className={cn('ml-auto w-4 text-center text-xs font-bold', statusConfig.color)}>
          {statusConfig.letter}
        </span>
      )}
    </motion.div>
  );
};

export type FolderProps = {
  name: string;
  children?: React.ReactNode;
  className?: string;
  path?: string;
  status?: GitStatus;
};

export const Folder: React.FC<FolderProps> = ({
  name,
  children,
  className,
  path: externalPath,
  status,
}) => {
  const { openFolders, toggleFolder } = useFiles();
  const parentPath = React.useContext(FolderPathContext);
  const currentPath = externalPath || (parentPath ? `${parentPath}/${name}` : name);
  const isOpen = openFolders.has(currentPath);
  const hasChildren = React.Children.count(children) > 0;

  const statusConfig = status ? gitStatusStyles[status] : undefined;

  const handleToggle = () => {
    if (hasChildren) {
      toggleFolder(currentPath);
    }
  };

  return (
    <div className={className}>
      <motion.div
        onClick={handleToggle}
        whileHover={hasChildren ? { x: 2 } : {}}
        whileTap={hasChildren ? { scale: 0.98 } : {}}
        className={cn(
          'hover:bg-muted flex items-center rounded px-2 py-1 text-sm font-medium transition-colors',
          hasChildren && 'cursor-pointer',
        )}
      >
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ChevronRight className="text-muted-foreground mr-1 size-4 shrink-0" />
          </motion.div>
        ) : (
          <span className="w-5" />
        )}

        <motion.div
          animate={{ scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className={cn('text-muted-foreground', statusConfig?.color)}
        >
          {isOpen ? <FolderOpenIcon className="size-4" /> : <FolderIcon className="size-4" />}
        </motion.div>

        <span className={cn('ml-2 flex-1 truncate', statusConfig?.color)}>{name}</span>

        {statusConfig && (
          <span className={cn('ml-auto w-4 text-center text-xs font-bold', statusConfig.color)}>
            {statusConfig.letter}
          </span>
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-border mt-1 ml-2 border-l pl-4">
              <FolderPathContext.Provider value={currentPath}>
                {children}
              </FolderPathContext.Provider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type FilesProps = {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
};

export const Files: React.FC<FilesProps> = ({ children, defaultValue, className }) => {
  const [openFolders, setOpenFolders] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set();

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
