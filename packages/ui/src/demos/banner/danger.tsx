'use client';

import { Banner } from '../../components/banner';

export function Danger() {
  return (
    <Banner variant="danger">
      <Banner.Content>
        <Banner.Title>Danger</Banner.Title>
        <Banner.Description>This is a danger banner.</Banner.Description>
      </Banner.Content>
    </Banner>
  );
}
