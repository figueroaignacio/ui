import { Spinner } from '@repo/ui/components/spinner';

export default function SpinnerVariants() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <Spinner variant="default" />
      <Spinner variant="primary" />
      <Spinner variant="muted" />
      <Spinner variant="success" />
      <Spinner variant="destructive" />
      <Spinner variant="warning" />
      <Spinner variant="info" />
    </div>
  );
}
