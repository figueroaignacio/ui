'use client';

import { Accordion } from '@repo/ui/components/accordion';
import { useTranslations } from 'next-intl';

interface FaqItem {
  question: string;
  answer: string;
}

export function DocsFaq() {
  const t = useTranslations('sections.faq');
  const items: FaqItem[] = t.raw('items');

  return (
    <section className="bg-background relative z-10 w-full pt-7">
      <div className="flex flex-col gap-12">
        <div>
          <Accordion type="single" className="w-full">
            {items.map((item, idx) => (
              <Accordion.Item key={idx} value={`item-${idx}`}>
                <Accordion.Trigger value={`item-${idx}`}>{item.question}</Accordion.Trigger>
                <Accordion.Content value={`item-${idx}`}>{item.answer}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
