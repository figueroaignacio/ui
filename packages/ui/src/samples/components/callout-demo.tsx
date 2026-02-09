import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Callout } from '../../components/callout';

export function CalloutDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Callout title="Default Callout">
        This is a default callout without any specific variant.
      </Callout>

      <Callout variant="info" title="Information" icon={<Info size={18} />}>
        This is an info callout used for general information.
      </Callout>

      <Callout variant="warning" title="Warning" icon={<AlertTriangle size={18} />}>
        This is a warning callout. Be careful interacting with this.
      </Callout>

      <Callout variant="danger" title="Error" icon={<AlertCircle size={18} />}>
        This is a danger callout. Something went wrong.
      </Callout>

      <Callout variant="success" title="Success" icon={<CheckCircle size={18} />}>
        This is a success callout. The operation was completed successfully.
      </Callout>
    </div>
  );
}
