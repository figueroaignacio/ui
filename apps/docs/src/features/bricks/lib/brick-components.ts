import type { ComponentType } from 'react';

import { Login01 } from '../../../../../../packages/ui/src/bricks/login/login-01';
import { Login02 } from '../../../../../../packages/ui/src/bricks/login/login-02';
import { Login03 } from '../../../../../../packages/ui/src/bricks/login/login-03';
import { Signup01 } from '../../../../../../packages/ui/src/bricks/signup/signup-01';
import { Signup02 } from '../../../../../../packages/ui/src/bricks/signup/signup-02';

export const BRICK_COMPONENTS: Record<string, ComponentType> = {
  'login-01': Login01,
  'login-02': Login02,
  'login-03': Login03,
  'signup-01': Signup01,
  'signup-02': Signup02,
};
