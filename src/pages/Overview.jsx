import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Download,
  Calendar,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { InteractiveAreaChart, DonutChart } from '../components/Charts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import {
  kpiStats,
  revenueChartData,
  categoryBreakdown,
  recentTransactions,
  productsCatalog,
} from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function Overview() {
  const [chartView, setChartView] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Executive Report CSV generated and downloaded!');
    }, 1000);
  };

  const statIcons = [DollarSign, ShoppingCart, Users, TrendingUp];
  const statColors = [
    'text-brand-600 bg-brand-50 border-brand-200/60',
    'text-sky-600 bg-sky-50 border-sky-200/60',
    'text-emerald-600 bg-emerald-50 border-emerald-200/60',
    'text-amber-600 bg-amber-50 border-amber-200/60',
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time performance metrics and business growth indicators.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 shadow-subtle">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Nov 1 – Nov 30, 2026</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Download}
            isLoading={isExporting}
            onClick={handleExport}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiStats.map((stat, idx) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            timeframe={stat.timeframe}
            type={stat.type}
            icon={statIcons[idx]}
            iconColor={statColors[idx]}
          />
        ))}
      </div>

      {/* Visual Analytics Section: Revenue Curve + Category Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue Velocity & Target Forecast</CardTitle>
              <CardDescription>
                Gross revenue against quarterly target goals with spline curve projection.
              </CardDescription>
            </div>

            {/* Timeframe selector toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setChartView('monthly')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartView === 'monthly'
                    ? 'bg-white text-slate-900 font-semibold shadow-subtle'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                12 Months
              </button>
              <button
                type="button"
                onClick={() => setChartView('weekly')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartView === 'weekly'
                    ? 'bg-white text-slate-900 font-semibold shadow-subtle'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Last 7 Days
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            <InteractiveAreaChart data={revenueChartData[chartView]} height={260} />
          </CardContent>
        </Card>

        {/* Category Breakdown Donut Chart */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Sales by Channel</CardTitle>
              <CardDescription>Portfolio revenue distribution</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <DonutChart data={categoryBreakdown} size={180} />
          </CardContent>
        </Card>
      </div>

      {/* Lower Section: Recent Transactions & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Live incoming customer transactions</CardDescription>
            </div>
            <NavLink
              to="/orders"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </NavLink>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 text-2xs uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-4 py-3">Plan / Product</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={tx.avatar}
                          alt={tx.customer}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{tx.customer}</span>
                          <span className="text-2xs text-slate-400">{tx.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600">
                      {tx.plan}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge
                        hasDot
                        variant={
                          tx.status === 'Completed'
                            ? 'success'
                            : tx.status === 'Processing'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-right font-semibold text-slate-900">
                      {formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products Quick View */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best-sellers by units moved</CardDescription>
            </div>
            <NavLink
              to="/products"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Browse
            </NavLink>
          </CardHeader>
          <CardContent className="space-y-4">
            {productsCatalog.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex flex-col truncate pr-3">
                  <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-700 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-2xs text-slate-400 truncate">
                    {item.category} • {item.sales} units sold
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900">
                    {formatCurrency(item.price)}
                  </span>
                  <div className="text-2xs text-emerald-600 font-medium">★ {item.rating}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
