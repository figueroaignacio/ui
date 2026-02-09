'use client';

import { ArrowLeft } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  const t = useTranslations('components.backButton');

  function onBack() {
    router.back();
  }

  return (
    <button
      onClick={onBack}
      className="hover:text-primary flex items-center gap-x-2 text-sm hover:cursor-pointer hover:underline"
    >
      <HugeiconsIcon icon={ArrowLeft} />
      {t('label')}
    </button>
  );
}
