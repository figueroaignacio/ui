'use client';

import { Banner } from '../../components/banner';

export function Default() {
  return (
    <Banner>
      <Banner.Content>
        <Banner.Title>New feature available</Banner.Title>
        <Banner.Description>Check out the latest updates we just shipped.</Banner.Description>
      </Banner.Content>
      <Banner.Action href="#changelog">Learn more</Banner.Action>
    </Banner>
  );
}
