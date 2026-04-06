import { Callout } from '../../components/callout';

export function Danger() {
  return (
    <Callout variant="danger">
      <Callout.Title>Error</Callout.Title>
      <Callout.Content>This is a danger callout. Something went wrong.</Callout.Content>
    </Callout>
  );
}
