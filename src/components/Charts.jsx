import React, { useState } from 'react';
import { formatCurrency, formatNumber } from '../utils/formatters';

export function InteractiveAreaChart({ data = [], height = 240 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.target || 0))) * 1.15;
  const minVal = 0;
  const paddingX = 40;
  const paddingY = 25;
  const width = 600;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.revenue - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const targetPoints = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (((d.target || 0) - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y };
  });

  // Generate smooth SVG curve
  function createSvgPath(pts) {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  }

  const linePath = createSvgPath(points);
  const targetLinePath = createSvgPath(targetPoints);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const hoveredPoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#6366F1" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Horizontal background grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct, i) => {
          const yPos = height - paddingY - pct * (height - paddingY * 2);
          const gridVal = maxVal * pct;
          return (
            <g key={i}>
              <line
                x1={paddingX}
                y1={yPos}
                x2={width - paddingX}
                y2={yPos}
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 10}
                y={yPos + 3}
                textAnchor="end"
                className="fill-slate-400 text-[9px] font-sans"
              >
                ${Math.round(gridVal / 1000)}k
              </text>
            </g>
          );
        })}

        {/* Baseline */}
        <line
          x1={paddingX}
          y1={height - paddingY}
          x2={width - paddingX}
          y2={height - paddingY}
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Area fill */}
        <path d={areaPath} fill="url(#revenueGradient)" />

        {/* Target Benchmark dashed line */}
        <path
          d={targetLinePath}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="5 5"
          opacity="0.6"
        />

        {/* Main Revenue line */}
        <path
          d={linePath}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* X-axis labels */}
        {points.map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={height - 8}
            textAnchor="middle"
            className={`text-[10px] font-medium transition-colors ${
              hoveredIdx === i ? 'fill-brand-600 font-bold' : 'fill-slate-400'
            }`}
          >
            {pt.label}
          </text>
        ))}

        {/* Interactive hover overlays */}
        {points.map((pt, i) => (
          <rect
            key={i}
            x={pt.x - (width / points.length) / 2}
            y={0}
            width={width / points.length}
            height={height}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
          />
        ))}

        {/* Active Hover Marker */}
        {hoveredPoint && (
          <g>
            <line
              x1={hoveredPoint.x}
              y1={paddingY}
              x2={hoveredPoint.x}
              y2={height - paddingY}
              stroke="#6366F1"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Target point indicator */}
            <circle
              cx={hoveredPoint.x}
              cy={targetPoints[hoveredIdx].y}
              r="4"
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            {/* Revenue point indicator */}
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="6"
              fill="#4F46E5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="animate-pulse"
            />
          </g>
        )}
      </svg>

      {/* Interactive Tooltip Card */}
      {hoveredPoint && (
        <div
          className="absolute pointer-events-none z-20 bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl text-xs flex flex-col gap-1 transition-all duration-150 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(hoveredPoint.x / width) * 100}%`,
            top: `${(hoveredPoint.y / height) * 100 - 10}%`,
          }}
        >
          <div className="font-semibold text-slate-300 border-b border-slate-700/60 pb-1">
            {hoveredPoint.label} Performance
          </div>
          <div className="flex items-center justify-between gap-3 text-emerald-400 font-bold">
            <span>Revenue:</span>
            <span>{formatCurrency(hoveredPoint.revenue)}</span>
          </div>
          {hoveredPoint.target && (
            <div className="flex items-center justify-between gap-3 text-slate-400">
              <span>Target:</span>
              <span>{formatCurrency(hoveredPoint.target)}</span>
            </div>
          )}
          {hoveredPoint.orders && (
            <div className="flex items-center justify-between gap-3 text-slate-300">
              <span>Orders:</span>
              <span>{formatNumber(hoveredPoint.orders)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DonutChart({ data = [], size = 180 }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  let accumulatedAngle = 0;
  const radius = 64;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 transform">
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle;
            accumulatedAngle += (item.percentage / 100) * circumference;

            const isHovered = hoveredSlice === index;

            return (
              <circle
                key={index}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            );
          })}
        </svg>

        {/* Central Summary */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xs uppercase tracking-wider text-slate-400 font-semibold">
            {hoveredSlice !== null ? data[hoveredSlice].name.split(' ')[0] : 'Total Sales'}
          </span>
          <span className="text-base font-bold text-slate-800">
            {hoveredSlice !== null
              ? `${data[hoveredSlice].percentage}%`
              : formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="mt-4 w-full grid grid-cols-2 gap-2 text-xs">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
              hoveredSlice === idx ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
            onMouseEnter={() => setHoveredSlice(idx)}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col truncate">
              <span className="truncate font-medium text-slate-700">{item.name}</span>
              <span className="text-2xs text-slate-400 font-semibold">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ data = [], height = 180 }) {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map((d) => d.orders || d.revenue || 100)) * 1.1;

  return (
    <div className="w-full flex items-end justify-between gap-2 pt-6" style={{ height }}>
      {data.map((item, idx) => {
        const val = item.orders || item.revenue;
        const barHeight = Math.max((val / maxVal) * 100, 6);

        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
              {formatNumber(val)}
            </div>

            {/* Bar */}
            <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full max-w-[36px]">
              <div
                className="w-full bg-brand-500 hover:bg-brand-600 rounded-t-lg transition-all duration-300 group-hover:bg-brand-600"
                style={{ height: `${barHeight}%` }}
              />
            </div>

            {/* Label */}
            <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
