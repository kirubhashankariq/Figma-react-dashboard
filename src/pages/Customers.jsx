import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  MapPin,
  Building,
  DollarSign,
  ShoppingBag,
  ExternalLink,
  MoreVertical,
} from 'lucide-react';
import { customersList } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import Card, { CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { SearchInput, Input } from '../components/Input';
import Modal from '../components/Modal';

export default function Customers() {
  const [customers, setCustomers] = useState(customersList);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    location: '',
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const created = {
      id: `CUST-00${customers.length + 1}`,
      name: newCustomer.name,
      email: newCustomer.email,
      company: newCustomer.company,
      role: newCustomer.role || 'Client Member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      spent: 0,
      ordersCount: 0,
      status: 'Active',
      joined: new Date().toISOString().split('T')[0],
      location: newCustomer.location || 'Remote',
    };
    setCustomers([created, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', email: '', company: '', role: '', location: '' });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customer Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Overview of enterprise accounts, contacts, and cumulative customer lifetime value.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Customer
        </Button>
      </div>

      {/* Top Search & Metrics Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search by client name, email, company..."
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 self-center">
          <span>
            Total Clients: <strong className="text-slate-800">{customers.length}</strong>
          </span>
          <span>•</span>
          <span>
            Active:{' '}
            <strong className="text-emerald-600">
              {customers.filter((c) => c.status === 'Active').length}
            </strong>
          </span>
        </div>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} hover className="p-5 flex flex-col justify-between">
            <div>
              {/* Top Row: Avatar & Status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {customer.name}
                    </h4>
                    <p className="text-2xs text-slate-400 mt-0.5">{customer.role}</p>
                  </div>
                </div>

                <Badge
                  hasDot
                  variant={customer.status === 'Active' ? 'success' : 'neutral'}
                  size="sm"
                >
                  {customer.status}
                </Badge>
              </div>

              {/* Company & Details info */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700 truncate">
                    {customer.company}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate text-slate-500">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate text-slate-500">{customer.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom Stats: Spent & Orders */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-2xs text-slate-400">Total Spent</span>
                <p className="font-bold text-slate-900 text-sm">
                  {formatCurrency(customer.spent)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xs text-slate-400">Orders</span>
                <p className="font-bold text-slate-900 text-sm">{customer.ordersCount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
        description="Register a new client profile in your dashboard directory."
      >
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Jane Doe"
            required
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <Input
            label="Work Email"
            type="email"
            placeholder="e.g. jane@company.com"
            required
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Company"
              placeholder="e.g. Stripe Inc."
              required
              value={newCustomer.company}
              onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
            />
            <Input
              label="Role / Title"
              placeholder="e.g. VP Engineering"
              value={newCustomer.role}
              onChange={(e) => setNewCustomer({ ...newCustomer, role: e.target.value })}
            />
          </div>
          <Input
            label="Location"
            placeholder="e.g. New York, USA"
            value={newCustomer.location}
            onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
