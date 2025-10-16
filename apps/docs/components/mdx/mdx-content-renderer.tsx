import 'katex/dist/katex.min.css';
import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from './components';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContentRenderer = ({ code, components }: MDXProps) => {
  try {
    const Component = useMDXComponent(code);
    return <Component components={{ ...mdxComponents, ...components }} />;
  } catch (error) {
    console.error('Error rendering MDX:', error);
    return (
      <div className="border-destructive bg-destructive/10 rounded-lg border p-4">
        <p className="text-destructive font-semibold">Error rendering content</p>
        <pre className="mt-2 text-xs">{String(error)}</pre>
      </div>
    );
  }
};
