import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Settings,
  HelpCircle,
  X,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { cn } from '../utils/formatters';
import { userProfile } from '../utils/mockData';

const mainNavigation = [
  { name: 'Overview', to: '/', icon: LayoutDashboard },
  { name: 'Analytics', to: '/analytics', icon: BarChart3 },
  { name: 'Orders', to: '/orders', icon: ShoppingCart, badge: '10' },
  { name: 'Customers', to: '/customers', icon: Users },
  { name: 'Products', to: '/products', icon: Package },
  { name: 'Invoices', to: '/invoices', icon: FileText, badge: '3' },
];

const secondaryNavigation = [
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header & Brand Logo */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-slate-900 tracking-tight leading-none">
                  Nexus<span className="text-brand-600">Dash</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                  Enterprise UI
                </span>
              </div>
            </NavLink>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-5 space-y-6">
            <div>
              <div className="px-3 mb-2 text-2xs font-semibold uppercase tracking-wider text-slate-400">
                Main Menu
              </div>
              <nav className="space-y-1">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      onClick={onClose}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group',
                          isActive
                            ? 'bg-brand-50 text-brand-700 font-semibold shadow-subtle'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon
                              className={cn(
                                'w-4 h-4 transition-colors',
                                isActive
                                  ? 'text-brand-600'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              )}
                            />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={cn(
                                'text-[11px] font-semibold px-2 py-0.5 rounded-full',
                                isActive
                                  ? 'bg-brand-600 text-white'
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 mb-2 text-2xs font-semibold uppercase tracking-wider text-slate-400">
                Preferences
              </div>
              <nav className="space-y-1">
                {secondaryNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group',
                          isActive
                            ? 'bg-brand-50 text-brand-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <div className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              'w-4 h-4 transition-colors',
                              isActive
                                ? 'text-brand-600'
                                : 'text-slate-400 group-hover:text-slate-600'
                            )}
                          />
                          <span>{item.name}</span>
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <NavLink
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors group"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm shrink-0"
            />
            <div className="flex flex-col truncate flex-1">
              <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-700 transition-colors">
                {userProfile.name}
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                Frontend Architect
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </NavLink>
        </div>
      </aside>
    </>
  );
}
