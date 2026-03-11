import { Accordion } from '../../components/accordion';

export function Collapsed() {
  return (
    <Accordion type="single" className="w-full">
      <Accordion.Item value="item-1">
        <Accordion.Trigger value="item-1">Will it start closed?</Accordion.Trigger>
        <Accordion.Content value="item-1">
          Yes! When you don't provide a defaultValue prop, all items start in a collapsed state.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger value="item-2">Can users still open items?</Accordion.Trigger>
        <Accordion.Content value="item-2">
          Of course! Users can click any trigger to expand the content. It just starts fully
          collapsed.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger value="item-3">When is this useful?</Accordion.Trigger>
        <Accordion.Content value="item-3">
          This is great when you want users to actively choose what information they want to see,
          keeping the interface clean initially.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
