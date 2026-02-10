import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/accordion';

export function Collapsed() {
  return (
    <Accordion type="single" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Will it start closed?</AccordionTrigger>
        <AccordionContent>
          Yes! When you don't provide a defaultValue prop, all items start in a collapsed state.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can users still open items?</AccordionTrigger>
        <AccordionContent>
          Of course! Users can click any trigger to expand the content. It just starts fully
          collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>When is this useful?</AccordionTrigger>
        <AccordionContent>
          This is great when you want users to actively choose what information they want to see,
          keeping the interface clean initially.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
