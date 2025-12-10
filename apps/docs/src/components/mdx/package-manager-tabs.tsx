// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/tabs';
import { CodeBlock } from './codeblock';

// Icons
import { PackageManagerIcons } from './package-manager-icons';

interface PackageManagerTabsProps {
  command: string;
  managers?: Array<'npm' | 'pnpm' | 'yarn' | 'bun'>;
  defaultManager?: 'npm' | 'pnpm' | 'yarn' | 'bun';
  showLineNumbers?: boolean;
}

const PACKAGE_MANAGERS = {
  npm: {
    name: 'npm',
    icon: PackageManagerIcons.npm,
  },
  pnpm: {
    name: 'pnpm',
    icon: PackageManagerIcons.pnpm,
  },
  yarn: {
    name: 'yarn',
    icon: PackageManagerIcons.yarn,
  },
  bun: {
    name: 'bun',
    icon: PackageManagerIcons.bun,
  },
} as const;

export function PackageManagerTabs({
  command,
  managers = ['npm', 'pnpm', 'yarn', 'bun'],
  defaultManager = 'npm',
  showLineNumbers = false,
}: PackageManagerTabsProps) {
  return (
    <Tabs defaultValue={defaultManager} className="mt-5 w-full" size="sm">
      <TabsList variant="default">
        {managers.map((manager) => (
          <TabsTrigger key={manager} value={manager} leftIcon={PACKAGE_MANAGERS[manager].icon}>
            {PACKAGE_MANAGERS[manager].name}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((manager) => (
        <TabsContent key={manager} value={manager} className="mt-0">
          <CodeBlock
            code={`${manager} ${command}`}
            language="bash"
            showLineNumbers={showLineNumbers}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
