import type { ComponentType } from 'react';

import Dashboard01 from '../../../../../../packages/ui/src/bricks/dashboard/dashboard-01/app/dashboard/page';
import Dashboard02 from '../../../../../../packages/ui/src/bricks/dashboard/dashboard-02/app/dashboard/page';
import Login01 from '../../../../../../packages/ui/src/bricks/login/login-01/app/login/page';
import Login02 from '../../../../../../packages/ui/src/bricks/login/login-02/app/login/page';
import Login03 from '../../../../../../packages/ui/src/bricks/login/login-03/app/login/page';
import Pricing01 from '../../../../../../packages/ui/src/bricks/pricing/pricing-01/app/pricing/page';
import Pricing02 from '../../../../../../packages/ui/src/bricks/pricing/pricing-02/app/pricing/page';
import Settings01 from '../../../../../../packages/ui/src/bricks/settings/settings-01/app/settings/page';
import Settings02 from '../../../../../../packages/ui/src/bricks/settings/settings-02/app/settings/page';
import Signup01 from '../../../../../../packages/ui/src/bricks/signup/signup-01/app/signup/page';
import Signup02 from '../../../../../../packages/ui/src/bricks/signup/signup-02/app/signup/page';

export const BRICK_COMPONENTS: Record<string, ComponentType> = {
  'dashboard-01': Dashboard01,
  'dashboard-02': Dashboard02,
  'login-01': Login01,
  'login-02': Login02,
  'login-03': Login03,
  'pricing-01': Pricing01,
  'pricing-02': Pricing02,
  'settings-01': Settings01,
  'settings-02': Settings02,
  'signup-01': Signup01,
  'signup-02': Signup02,
};
