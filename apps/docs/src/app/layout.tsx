import { Fragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
