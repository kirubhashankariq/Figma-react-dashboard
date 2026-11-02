import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  CheckCircle,
  MoreVertical,
  XCircle,
  Clock,
  ArrowUpDown,
} from 'lucide-react';
import { allOrders } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TablePagination } from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { SearchInput } from '../components/Input';
import Dropdown, { DropdownItem } from '../components/Dropdown';
import Modal from '../components/Modal';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 5;

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const statusVariants = {
    Delivered: 'success',
    Processing: 'warning',
    Shipped: 'info',
    Cancelled: 'danger',
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Orders & Transactions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage customer purchases, fulfillment statuses, and automated receipts.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => alert('Exporting all orders to CSV...')}
        >
          Export CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 text-xs font-medium">
          {['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="w-full md:w-72">
          <SearchInput
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onClear={() => setSearchTerm('')}
            placeholder="Search order ID, client, product..."
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="space-y-3">
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-brand-600">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{order.customer}</span>
                      <span className="text-2xs text-slate-400">{order.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 max-w-[200px] truncate">
                    {order.product}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell>
                    <Badge hasDot variant={statusVariants[order.status] || 'neutral'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900">
                    {formatCurrency(order.amount)}
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
                        icon={Eye}
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Order Details
                      </DropdownItem>
                      <DropdownItem
                        icon={FileText}
                        onClick={() => alert(`Generating Invoice for ${order.id}`)}
                      >
                        Download Invoice
                      </DropdownItem>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-slate-400 text-sm">
                  No orders match your search and filter criteria.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>

        {/* Table Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Order Detail Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details: ${selectedOrder.id}` : ''}
        description="Complete summary of customer order and payment verification."
      >
        {selectedOrder && (
          <div className="space-y-5 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Customer</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedOrder.customer}</p>
                <p className="text-xs text-slate-500">{selectedOrder.email}</p>
              </div>
              <Badge hasDot variant={statusVariants[selectedOrder.status]}>
                {selectedOrder.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400">Date Placed:</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {formatDate(selectedOrder.date)}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400">Payment:</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedOrder.paymentMethod}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{selectedOrder.product} (×{selectedOrder.items || 1})</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(selectedOrder.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Taxes & Compliance (Included)</span>
                <span>$0.00</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-slate-900 border-t border-slate-100 pt-3">
                <span>Total Paid</span>
                <span className="text-brand-600">{formatCurrency(selectedOrder.amount)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Download}
                onClick={() => {
                  alert(`Receipt for ${selectedOrder.id} downloaded.`);
                  setSelectedOrder(null);
                }}
              >
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
