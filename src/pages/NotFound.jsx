import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4 shadow-sm">
        <span className="text-2xl font-black">404</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md">
        The dashboard view you are looking for does not exist or has been relocated.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <NavLink to="/">
          <Button variant="primary" icon={Home}>
            Back to Dashboard
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
