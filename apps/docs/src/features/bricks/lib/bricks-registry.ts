import { BRICK_REGISTRY } from '@repo/ui/registry';

export interface BrickDefinition {
  id: string;
  name: string;
  description: string;
  component: string;
}

export interface BrickCategory {
  slug: string;
  name: string;
  description: string;
  bricks: BrickDefinition[];
}

export const BRICK_CATEGORIES: BrickCategory[] = [
  {
    slug: 'login',
    name: 'Login',
    description: 'Authentication login forms with various layouts and styles.',
    bricks: [
      {
        id: 'login-01',
        name: 'Simple Login',
        description: 'A simple login form with email and password.',
        component: 'login-01',
      },
      {
        id: 'login-02',
        name: 'Login with Social',
        description: 'A login form with social provider buttons and separator.',
        component: 'login-02',
      },
      {
        id: 'login-03',
        name: 'Split Screen Login',
        description: 'A two-column login page with a cover image and testimonial.',
        component: 'login-03',
      },
    ],
  },
  {
    slug: 'signup',
    name: 'Signup',
    description: 'Registration and signup forms for new users.',
    bricks: [
      {
        id: 'signup-01',
        name: 'Simple Signup',
        description: 'A registration form with name, email, and password fields.',
        component: 'signup-01',
      },
      {
        id: 'signup-02',
        name: 'Signup with Social',
        description: 'A registration form with social providers and email.',
        component: 'signup-02',
      },
    ],
  },
];

export function getBrickCategory(slug: string): BrickCategory | undefined {
  return BRICK_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(BRICK_REGISTRY);
}
