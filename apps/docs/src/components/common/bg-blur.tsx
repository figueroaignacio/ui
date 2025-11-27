export function BgBlur() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
    </div>
  );
}
