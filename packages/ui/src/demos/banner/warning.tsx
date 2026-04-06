'use client';

import { Banner } from '../../components/banner';

export function Warning() {
  return (
    <Banner variant="warning">
      <Banner.Content>
        <Banner.Title>Warning</Banner.Title>
        <Banner.Description>This is a warning banner.</Banner.Description>
      </Banner.Content>
    </Banner>
  );
}
