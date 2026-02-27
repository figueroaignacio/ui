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
        <AccordionTrigger value="item-1">Will it start closed?</AccordionTrigger>
        <AccordionContent value="item-1">
          Yes! When you don't provide a defaultValue prop, all items start in a collapsed state.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Can users still open items?</AccordionTrigger>
        <AccordionContent value="item-2">
          Of course! Users can click any trigger to expand the content. It just starts fully
          collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">When is this useful?</AccordionTrigger>
        <AccordionContent value="item-3">
          This is great when you want users to actively choose what information they want to see,
          keeping the interface clean initially.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
