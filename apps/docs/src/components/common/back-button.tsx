'use client';

import { ArrowLeft } from 'lucide-react';
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
      <ArrowLeft className="size-5" />
      {t('label')}
    </button>
  );
}
