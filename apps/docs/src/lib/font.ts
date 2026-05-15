import { Geist, JetBrains_Mono, Outfit } from 'next/font/google';

export const fontHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});
