import { JetBrains_Mono, Manrope } from 'next/font/google';

export const fontSans = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});
