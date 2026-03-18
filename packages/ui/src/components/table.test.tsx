import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Table } from './table';

describe('Table', () => {
  it('renders complete structure correctly', () => {
    render(
      <Table>
        <Table.Caption>A list of recent invoices.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>INV001</Table.Cell>
            <Table.Cell>Paid</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>$250.00</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('A list of recent invoices.')).toBeInTheDocument();
    expect(screen.getByText('Invoice')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('INV001')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });
});
