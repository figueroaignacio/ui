interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="max-w-[1580px] lg:mt-6">
      <div className="mx-auto flex flex-1 flex-col px-6 md:max-w-3xl lg:max-w-[1580px]">
        {children}
      </div>
    </div>
  );
}
