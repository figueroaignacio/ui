import { Accordion } from '../../components/accordion';

export function Multiple() {
  return (
    <Accordion type="multiple" className="w-full">
      <Accordion.Item value="item-1">
        <Accordion.Trigger value="item-1">Can I open multiple items?</Accordion.Trigger>
        <Accordion.Content value="item-1">
          Yes! When using type="multiple", you can have multiple accordion items open at the same
          time.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger value="item-2">How does it work?</Accordion.Trigger>
        <Accordion.Content value="item-2">
          Simply set the type prop to "multiple" and users can expand as many sections as they want
          simultaneously.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger value="item-3">Is this useful?</Accordion.Trigger>
        <Accordion.Content value="item-3">
          Absolutely! It's perfect for FAQ sections where users might want to compare multiple
          answers at once.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
