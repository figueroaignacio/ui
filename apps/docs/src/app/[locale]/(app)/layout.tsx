interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="mt-6 max-w-[1580px]">
      <div className="mx-auto flex flex-1 flex-col px-5 md:max-w-3xl lg:max-w-[1580px]">
        {children}
      </div>
    </div>
  );
}
