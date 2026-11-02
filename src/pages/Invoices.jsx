import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Printer,
} from 'lucide-react';
import { invoicesList } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Dropdown, { DropdownItem } from '../components/Dropdown';
import Modal from '../components/Modal';
import Input, { Select } from '../components/Input';

export default function Invoices() {
  const [invoices, setInvoices] = useState(invoicesList);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    dueDate: '',
  });

  const filteredInvoices = invoices.filter(
    (inv) => filterStatus === 'All' || inv.status === filterStatus
  );

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const created = {
      id: `INV-2026-0${invoices.length + 90}`,
      client: newInvoice.client,
      amount: parseFloat(newInvoice.amount) || 0,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate || '2026-11-30',
      status: 'Pending',
    };
    setInvoices([created, ...invoices]);
    setIsModalOpen(false);
    setNewInvoice({ client: '', amount: '', dueDate: '' });
  };

  const handleMarkAsPaid = (id) => {
    setInvoices(
      invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Invoices & Billing History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track account receivables, payment receipts, and automated tax invoicing.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Generate Invoice
        </Button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400">
            Total Invoiced
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {formatCurrency(totalBilled)}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">
            Across {invoices.length} invoices
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-2xs font-semibold uppercase tracking-wider text-emerald-600">
            Paid to Date
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {formatCurrency(totalPaid)}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">Settled funds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-2xs font-semibold uppercase tracking-wider text-amber-600">
            Pending Collection
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {formatCurrency(totalPending)}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">Within net-30 terms</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-2xs font-semibold uppercase tracking-wider text-rose-600">
            Overdue
          </span>
          <div className="text-2xl font-bold text-rose-600 mt-1">
            {formatCurrency(totalOverdue)}
          </div>
          <span className="text-2xs text-rose-500 mt-1 block">Requires reminder</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-card text-xs font-medium overflow-x-auto">
        {['All', 'Paid', 'Pending', 'Overdue'].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filterStatus === status
                ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200/60'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-semibold text-brand-600">{inv.id}</TableCell>
              <TableCell className="font-semibold text-slate-800">{inv.client}</TableCell>
              <TableCell className="text-slate-500 text-xs">{formatDate(inv.issueDate)}</TableCell>
              <TableCell className="text-slate-500 text-xs">{formatDate(inv.dueDate)}</TableCell>
              <TableCell>
                <Badge
                  hasDot
                  variant={
                    inv.status === 'Paid'
                      ? 'success'
                      : inv.status === 'Pending'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900">
                {formatCurrency(inv.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Dropdown
                  align="right"
                  trigger={
                    <button
                      type="button"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  }
                >
                  <DropdownItem
                    icon={Download}
                    onClick={() => alert(`Downloading PDF for ${inv.id}`)}
                  >
                    Download PDF
                  </DropdownItem>
                  <DropdownItem
                    icon={Send}
                    onClick={() => alert(`Reminder sent to ${inv.client}`)}
                  >
                    Send Email Reminder
                  </DropdownItem>
                  {inv.status !== 'Paid' && (
                    <DropdownItem
                      icon={CheckCircle}
                      onClick={() => handleMarkAsPaid(inv.id)}
                    >
                      Mark as Paid
                    </DropdownItem>
                  )}
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Generate Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Invoice"
        description="Draft an enterprise billing statement for a client organization."
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <Input
            label="Client Organization"
            placeholder="e.g. Acme Cloud Corp"
            required
            value={newInvoice.client}
            onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
          />
          <Input
            label="Total Amount ($ USD)"
            type="number"
            placeholder="3500.00"
            required
            value={newInvoice.amount}
            onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
          />
          <Input
            label="Payment Due Date"
            type="date"
            required
            value={newInvoice.dueDate}
            onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Issue Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
