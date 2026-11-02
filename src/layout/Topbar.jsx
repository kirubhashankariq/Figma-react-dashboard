import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Plus,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Sliders,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import Button from '../components/Button';
import Dropdown, { DropdownItem, DropdownDivider } from '../components/Dropdown';
import { notificationsList, userProfile } from '../utils/mockData';
import { cn } from '../utils/formatters';

const pageTitles = {
  '/': { title: 'Executive Overview', category: 'Dashboard' },
  '/analytics': { title: 'Detailed Analytics & Traffic', category: 'Reports' },
  '/orders': { title: 'Order Management', category: 'Commerce' },
  '/customers': { title: 'Customer Directory', category: 'Audience' },
  '/products': { title: 'Product Catalog & Inventory', category: 'Catalog' },
  '/invoices': { title: 'Billing & Invoices', category: 'Finance' },
  '/settings': { title: 'Account & Workspace Settings', category: 'Preferences' },
};

export default function Topbar({ onMenuClick, onOpenQuickAction }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const currentMeta = pageTitles[currentPath] || { title: 'Dashboard', category: 'Overview' };

  const [notifications, setNotifications] = useState(notificationsList);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-2xs text-slate-400 font-medium tracking-wider uppercase">
            <span>{currentMeta.category}</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">{currentMeta.title}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight hidden sm:block">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications, Actions, Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search trigger */}
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search orders, clients, metrics... (⌘K)"
            className="w-64 lg:w-72 pl-9 pr-12 py-1.5 text-xs text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl transition-all duration-150 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* Quick Action Button */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenQuickAction}
          className="hidden sm:inline-flex"
        >
          New Item
        </Button>

        {/* Notifications Dropdown */}
        <Dropdown
          align="right"
          className="w-80 sm:w-96"
          trigger={
            <div className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </div>
          }
        >
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-2xs font-semibold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-2xs text-brand-600 hover:text-brand-700 font-semibold"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-50 cursor-pointer',
                  !item.read && 'bg-brand-50/30'
                )}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  {item.type === 'order' ? (
                    <CreditCard className="w-4 h-4 text-brand-600" />
                  ) : item.type === 'security' ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ) : item.type === 'system' ? (
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {item.title}
                  </span>
                  <span className="text-2xs text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Notification Preferences →
            </button>
          </div>
        </Dropdown>

        {/* User Profile Menu */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-none">
                  {userProfile.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Pro Plan
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </div>
          }
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900">{userProfile.name}</p>
            <p className="text-2xs text-slate-400 truncate mt-0.5">{userProfile.email}</p>
          </div>

          <DropdownItem icon={User} onClick={() => navigate('/settings')}>
            Account Profile
          </DropdownItem>
          <DropdownItem icon={Sliders} onClick={() => navigate('/settings')}>
            Workspace Settings
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            icon={LogOut}
            danger
            onClick={() => alert('Logged out successfully.')}
          >
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
