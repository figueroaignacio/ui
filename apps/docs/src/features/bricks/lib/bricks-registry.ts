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
  {
    slug: 'pricing',
    name: 'Pricing',
    description: 'Pricing sections and plan comparison layouts.',
    bricks: [
      {
        id: 'pricing-01',
        name: 'Pricing Tiers',
        description: 'A 3-tier pricing grid with features and CTA buttons.',
        component: 'pricing-01',
      },
      {
        id: 'pricing-02',
        name: 'Plan Comparison',
        description: 'A comparison table with a monthly/yearly toggle.',
        component: 'pricing-02',
      },
    ],
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    description: 'Dashboard overview sections, tables, and progress widgets.',
    bricks: [
      {
        id: 'dashboard-01',
        name: 'Overview + Table',
        description: 'KPI cards and a recent invoices table.',
        component: 'dashboard-01',
      },
      {
        id: 'dashboard-02',
        name: 'Setup Checklist',
        description: 'A setup checklist with steps and progress.',
        component: 'dashboard-02',
      },
    ],
  },
  {
    slug: 'settings',
    name: 'Settings',
    description: 'Account settings, preferences, and notification panels.',
    bricks: [
      {
        id: 'settings-01',
        name: 'Tabbed Settings',
        description: 'Profile, security, and billing settings with tabs.',
        component: 'settings-01',
      },
      {
        id: 'settings-02',
        name: 'Notification Preferences',
        description: 'A preferences panel with an advanced drawer.',
        component: 'settings-02',
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
