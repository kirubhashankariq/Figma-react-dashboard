import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Layers,
  Filter,
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import StatCard from '../components/StatCard';
import { InteractiveAreaChart, BarChart } from '../components/Charts';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { revenueChartData } from '../utils/mockData';

const trafficSources = [
  { source: 'Direct Navigation', visits: 184200, percentage: 42, change: +8.4 },
  { source: 'Organic Search (SEO)', visits: 124900, percentage: 28, change: +14.1 },
  { source: 'Referral & Backlinks', visits: 78400, percentage: 18, change: +3.2 },
  { source: 'Paid Campaigns & Ads', visits: 34100, percentage: 8, change: -2.1 },
  { source: 'Social Channels', visits: 17800, percentage: 4, change: +11.5 },
];

const geographicData = [
  { region: 'North America (US & CA)', revenue: 64200, share: 50, flag: '🇺🇸' },
  { region: 'European Union (DE, FR, UK)', revenue: 38500, share: 30, flag: '🇪🇺' },
  { region: 'Asia Pacific (JP, IN, SG)', revenue: 19250, share: 15, flag: '🇯🇵' },
  { region: 'Rest of World', revenue: 6500, share: 5, flag: '🌐' },
];

export default function Analytics() {
  const [selectedRange, setSelectedRange] = useState('30d');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Performance & Traffic Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time session analytics, device distribution, and global acquisition channels.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs font-medium shadow-subtle self-start">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedRange === range
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Average Order Value"
          value={342.8}
          change={6.4}
          isPositive={true}
          type="currency"
          icon={TrendingUp}
          iconColor="text-brand-600 bg-brand-50 border-brand-200"
        />
        <StatCard
          title="Bounce Rate"
          value={28.4}
          change={-3.1}
          isPositive={true}
          type="percent"
          icon={Activity}
          iconColor="text-emerald-600 bg-emerald-50 border-emerald-200"
        />
        <StatCard
          title="Avg Session Duration"
          value={4.25}
          change={12.8}
          isPositive={true}
          type="number"
          timeframe="mins/user"
          icon={Layers}
          iconColor="text-sky-600 bg-sky-50 border-sky-200"
        />
        <StatCard
          title="Total Page Views"
          value={438900}
          change={18.2}
          isPositive={true}
          type="number"
          icon={Globe}
          iconColor="text-purple-600 bg-purple-50 border-purple-200"
        />
      </div>

      {/* Primary Chart: Order Volume vs Revenue */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Session Traffic & Demand Curve</CardTitle>
            <CardDescription>
              Correlating monthly visitor sessions against converted checkout transactions.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <InteractiveAreaChart data={revenueChartData.monthly} height={260} />
        </CardContent>
      </Card>

      {/* Lower Multi-grid: Traffic Channels & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Channels Breakdown */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Acquisition Channels</CardTitle>
              <CardDescription>Visitor distribution by traffic source</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficSources.map((ch, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{ch.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-medium">
                      {formatNumber(ch.visits)} visits
                    </span>
                    <span
                      className={`font-semibold ${
                        ch.change > 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {ch.change > 0 ? `+${ch.change}%` : `${ch.change}%`}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                    style={{ width: `${ch.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Regional Distribution */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Geographic Revenue Split</CardTitle>
              <CardDescription>Top contributing regions</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {geographicData.map((geo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{geo.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800">
                      {geo.region}
                    </span>
                    <span className="text-2xs text-slate-400">
                      {geo.share}% of total gross volume
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900">
                  {formatCurrency(geo.revenue)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
