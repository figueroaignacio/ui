import { Callout } from '../../components/callout';

export function Success() {
  return (
    <Callout variant="success">
      <Callout.Title>Success</Callout.Title>
      <Callout.Content>
        This is a success callout. The operation was completed successfully.
      </Callout.Content>
    </Callout>
  );
}
