import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/accordion';

export function Multiple() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Can I open multiple items?</AccordionTrigger>
        <AccordionContent value="item-1">
          Yes! When using type="multiple", you can have multiple accordion items open at the same
          time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">How does it work?</AccordionTrigger>
        <AccordionContent value="item-2">
          Simply set the type prop to "multiple" and users can expand as many sections as they want
          simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Is this useful?</AccordionTrigger>
        <AccordionContent value="item-3">
          Absolutely! It's perfect for FAQ sections where users might want to compare multiple
          answers at once.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
