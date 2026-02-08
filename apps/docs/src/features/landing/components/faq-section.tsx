import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQSection({ faqs, title }: FAQSectionProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      {title && (
        <div className="mb-8">
          <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </div>
      )}
      <Accordion type="single" className="mt-6" defaultValue="faq-0">
        {faqs.map((faq, index) => (
          <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
            <AccordionTrigger className="gradient-text">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
