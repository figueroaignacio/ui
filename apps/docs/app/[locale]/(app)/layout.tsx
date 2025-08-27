// Components
import { Header } from '@/components/header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="max-w-[1580px]">
      <Header />
      <div className="flex max-w-[1580px] flex-1 flex-col px-5 lg:px-16">{children}</div>
    </div>
  );
}
