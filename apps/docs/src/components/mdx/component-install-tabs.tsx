import { Steps } from '@repo/ui/components/steps';
import { useTranslations } from 'next-intl';
import { ComponentInstallTabsClient } from './component-install-tabs-client';
import { ComponentSource } from './component-source';
import { PackageManagerTabs } from './package-manager-tabs';

interface ComponentInstallTabsProps {
  component: string;
  dependencies?: string;
}

export function ComponentInstallTabs({ component, dependencies }: ComponentInstallTabsProps) {
  const t = useTranslations('components.componentInstallTabs');

  const manualContent = (
    <Steps>
      {dependencies ? (
        <>
          <h4>{t('dependencies')}</h4>
          <PackageManagerTabs command={dependencies} />
          <h4>{t('copyCode')}</h4>
          <ComponentSource component={component} />
          <h4>{t('updatePaths')}</h4>
        </>
      ) : (
        <>
          <h4 className="text-sm">{t('copyCode')}</h4>
          <ComponentSource component={component} />
          <h4 className="text-sm">{t('updatePaths')}</h4>
        </>
      )}
    </Steps>
  );

  return <ComponentInstallTabsClient component={component} manualContent={manualContent} />;
}
