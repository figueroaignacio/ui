import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Files } from './files';

// Mock motion to display AnimatePresence correctly in simple tests
vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Files', () => {
  it('renders files and handles click', async () => {
    const handleClick = vi.fn();
    render(
      <Files>
        <Files.File name="index.ts" onClick={handleClick} />
      </Files>,
    );

    const file = screen.getByText('index.ts');
    expect(file).toBeInTheDocument();

    await userEvent.click(file);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders folders and toggles them', async () => {
    render(
      <Files>
        <Files.Folder name="src">
          <Files.File name="utils.ts" />
        </Files.Folder>
      </Files>,
    );

    const folder = screen.getByText('src');
    expect(folder).toBeInTheDocument();

    // File inside folder should mostly be hidden initially (rendered but unexpanded)
    // Toggling the folder shouldn't crash
    await userEvent.click(folder);
    const fileInFolder = screen.getByText('utils.ts');
    expect(fileInFolder).toBeInTheDocument();
  });

  it('renders git status styles correctly', () => {
    render(
      <Files>
        <Files.File name="modified.ts" status="modified" />
        <Files.File name="deleted.ts" status="deleted" />
        <Files.Folder name="added" status="added" />
      </Files>,
    );

    expect(screen.getByText('modified.ts')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();

    expect(screen.getByText('deleted.ts')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();

    expect(screen.getByText('added')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
