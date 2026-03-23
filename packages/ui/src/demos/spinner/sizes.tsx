import { Spinner } from '@repo/ui/components/spinner';

export default function SpinnerSizes() {
  return (
    <div className="flex items-end justify-center gap-6 py-8">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
