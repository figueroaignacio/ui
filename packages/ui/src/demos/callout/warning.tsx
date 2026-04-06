import { Callout } from '../../components/callout';

export function Warning() {
  return (
    <Callout variant="warning">
      <Callout.Title>Warning</Callout.Title>
      <Callout.Content>
        This is a warning callout. Be careful interacting with this.
      </Callout.Content>
    </Callout>
  );
}
