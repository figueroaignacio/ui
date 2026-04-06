'use client';

import { Banner } from '../../components/banner';

export function Info() {
  return (
    <Banner variant="info">
      <Banner.Content>
        <Banner.Title>Info</Banner.Title>
        <Banner.Description>This is an informational banner.</Banner.Description>
      </Banner.Content>
    </Banner>
  );
}
