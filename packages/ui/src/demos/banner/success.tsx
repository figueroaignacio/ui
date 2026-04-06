'use client';

import { Banner } from '../../components/banner';

export function Success() {
  return (
    <Banner variant="success">
      <Banner.Content>
        <Banner.Title>Success</Banner.Title>
        <Banner.Description>This is a success banner.</Banner.Description>
      </Banner.Content>
    </Banner>
  );
}
