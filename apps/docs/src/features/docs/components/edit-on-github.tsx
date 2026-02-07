'use client';

import { GitHubIcon } from '@/components/common/tech-icons';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';

type EditOnGithubProps = {
  filePath: string;
};

export function EditOnGithub({ filePath }: EditOnGithubProps) {
  const t = useTranslations('components.editOnGithub');

  return (
    <Button variant="outline" size="sm" className="h-8 gap-2" leftIcon={<GitHubIcon />}>
      <a
        href={`https://github.com/figueroaignacio/ui/edit/main/apps/docs/src/content/${filePath}.mdx`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('label')}
      </a>
    </Button>
  );
}
