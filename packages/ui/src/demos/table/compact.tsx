'use client';

import { Table } from '../../components/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
];

export function Compact() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="h-auto py-2 text-xs">Invoice</Table.Head>
          <Table.Head className="h-auto py-2 text-xs">Status</Table.Head>
          <Table.Head className="h-auto py-2 text-xs">Method</Table.Head>
          <Table.Head className="h-auto py-2 text-right text-xs">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="py-2 font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell className="py-2">{invoice.paymentStatus}</Table.Cell>
            <Table.Cell className="py-2">{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="py-2 text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
