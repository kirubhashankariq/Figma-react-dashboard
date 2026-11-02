import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Save,
  CheckCircle,
  Camera,
  Smartphone,
  Key,
} from 'lucide-react';
import { userProfile } from '../utils/mockData';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input, { Toggle, Select } from '../components/Input';
import Badge from '../components/Badge';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  // Notification states
  const [notifEmailOrder, setNotifEmailOrder] = useState(true);
  const [notifEmailWeekly, setNotifEmailWeekly] = useState(true);
  const [notifPushAlerts, setNotifPushAlerts] = useState(false);
  const [notifSecurity, setNotifSecurity] = useState(true);

  // Security states
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Account Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Settings & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal account, security parameters, and notification delivery.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-semibold">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-brand-600 text-brand-600 bg-brand-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your identity details and public profile avatar.
                </CardDescription>
              </div>
              {isSaved && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span>Changes saved successfully</span>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Avatar Uploader preview */}
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{profile.name}</h4>
                  <p className="text-xs text-slate-500">{profile.title}</p>
                  <span className="text-2xs text-brand-600 font-medium hover:underline cursor-pointer mt-1 inline-block">
                    Change profile image
                  </span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Professional Title"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
                <Input
                  label="Department / Team"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
                <Input
                  label="Timezone"
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Bio & Summary</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-subtle"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" icon={Save}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you receive automated platform digests.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 divide-y divide-slate-100">
            <Toggle
              label="Order & Transaction Alerts"
              description="Notify via email whenever a customer makes a high-value purchase."
              enabled={notifEmailOrder}
              onChange={setNotifEmailOrder}
            />
            <Toggle
              label="Weekly Executive Performance Digest"
              description="A condensed Monday morning breakdown of gross revenue and analytics."
              enabled={notifEmailWeekly}
              onChange={setNotifEmailWeekly}
            />
            <Toggle
              label="In-App Push Notifications"
              description="Real-time push alerts when new invoices are created or settled."
              enabled={notifPushAlerts}
              onChange={setNotifPushAlerts}
            />
            <Toggle
              label="Security & Audit Alerts"
              description="Instant SMS or email alert if an unrecognized session or IP logs in."
              enabled={notifSecurity}
              onChange={setNotifSecurity}
            />
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Authentication & Security</CardTitle>
                <CardDescription>Two-factor authentication and credentials.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 divide-y divide-slate-100">
              <Toggle
                label="Two-Factor Authentication (2FA)"
                description="Require an authenticator app (Google Authenticator, 1Password) at sign-in."
                enabled={twoFactor}
                onChange={setTwoFactor}
              />

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Account Password</h4>
                  <p className="text-xs text-slate-500">
                    Last modified 30 days ago. Strong password enabled.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert('Password reset link sent to your email.')}
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Your current subscription tier and resource quota.</CardDescription>
              </div>
              <Badge variant="success" hasDot>
                Active Subscription
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Nexus Enterprise Unlimited
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Includes unlimited team members, custom webhooks, and 99.99% uptime SLA.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-900">$499</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Next renewal invoice on <strong className="text-slate-700">Dec 1, 2026</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert('Managing Stripe Customer Portal...')}
                >
                  Manage Billing in Stripe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
