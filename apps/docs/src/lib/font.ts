import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';

export const fontHeading = Geist_Mono({
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
