import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input, { Select } from '../components/Input';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickActionModalOpen, setQuickActionModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setQuickActionModalOpen(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onOpenQuickAction={() => setQuickActionModalOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-6 sm:px-8 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} NexusDash. Built with Pixel-Perfect Precision for Alex Morgan.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">v1.0.0</span>
          </div>
        </footer>
      </div>

      {/* Quick Create Item Modal */}
      <Modal
        isOpen={quickActionModalOpen}
        onClose={() => setQuickActionModalOpen(false)}
        title="Create New Transaction / Entry"
        description="Quickly record a custom sale, manual order, or client subscription."
      >
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <Input
            label="Client Name / Organization"
            placeholder="e.g. Acme Corporation"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Transaction Type"
              options={[
                { value: 'license', label: 'Software License' },
                { value: 'subscription', label: 'Cloud Subscription' },
                { value: 'service', label: 'Consulting Service' },
              ]}
            />
            <Input
              label="Amount ($ USD)"
              type="number"
              placeholder="1200.00"
              required
            />
          </div>

          <Input
            label="Reference ID / Invoice Note"
            placeholder="e.g. Q4 Expansion Contract"
          />

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setQuickActionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={formSubmitted}
            >
              {formSubmitted ? 'Saving...' : 'Create Entry'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
