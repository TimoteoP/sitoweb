// Uso in MDX
// <LightBarChart 
//   title="Crescita Utenti Q1 2024"
//   description="Confronto crescita utenti per piattaforma"
//   data={[
//     { label: 'Facebook', value: 1200, color: '#1877f2' },
//     { label: 'Instagram', value: 950, color: '#e4405f' },
//     { label: 'LinkedIn', value: 680, color: '#0077b5' }
//   ]} 
//   valueFormat="users"
//   showGrid={true}
// />

'use client';

import { useState } from 'react';

type DataPoint = { 
  label: string; 
  value: number; 
  color?: string;
  description?: string;
};

type Props = {
  data: DataPoint[];
  title?: string;
  description?: string;
  height?: number;
  barGap?: number;
  padding?: number;
  valueFormat?: 'number' | 'percentage' | 'currency' | 'users' | string;
  showGrid?: boolean;
  animated?: boolean;
};

const defaultColors = ['#2563eb', '#f97316', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function LightBarChart({
  data,
  title,
  description,
  height = 280,
  barGap = 12,
  padding = 40,
  valueFormat = 'number',
  showGrid = false,
  animated = true,
}: Props) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  if (!data?.length) return null;

  const max = Math.max(...data.map(d => d.value)) || 1;
  const width = 600;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2 - 40; // Extra space for labels
  const barWidth = Math.min(80, (innerW - barGap * (data.length - 1)) / data.length);

  const formatValue = (value: number) => {
    switch (valueFormat) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `€${value.toLocaleString()}`;
      case 'users':
        return `${value.toLocaleString()} utenti`;
      default:
        return value.toLocaleString();
    }
  };

  // Generate grid lines
  const gridLines = [];
  if (showGrid) {
    for (let i = 1; i <= 4; i++) {
      const yPos = padding + (innerH * i) / 4;
      const gridValue = max * (4 - i) / 4;
      gridLines.push({
        y: yPos,
        value: gridValue,
      });
    }
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Title and Description */}
      {(title || description) && (
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {title && (
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 0.5rem 0',
            }}>
              {title}
            </h3>
          )}
          {description && (
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0,
            }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Chart Container */}
      <div style={{ 
        width: '100%', 
        overflowX: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #f3f4f6',
        padding: '1rem',
      }}>
        <svg 
          width={width} 
          height={height} 
          style={{ width: '100%', height: 'auto', maxWidth: `${width}px` }}
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* Background */}
          <rect width={width} height={height} fill="#ffffff" rx={12} />
          
          {/* Grid Lines */}
          {showGrid && gridLines.map((grid, i) => (
            <g key={i}>
              <line 
                x1={padding} 
                y1={grid.y} 
                x2={width - padding} 
                y2={grid.y} 
                stroke="#f3f4f6" 
                strokeWidth="1"
              />
              <text 
                x={padding - 8} 
                y={grid.y + 4} 
                textAnchor="end" 
                fontSize="10" 
                fill="#9ca3af"
              >
                {formatValue(grid.value)}
              </text>
            </g>
          ))}

          {/* X Axis */}
          <line 
            x1={padding} 
            y1={height - padding - 30} 
            x2={width - padding} 
            y2={height - padding - 30} 
            stroke="#e5e7eb" 
            strokeWidth="2"
          />

          {/* Y Axis */}
          <line 
            x1={padding} 
            y1={padding} 
            x2={padding} 
            y2={height - padding - 30} 
            stroke="#e5e7eb" 
            strokeWidth="2"
          />

          {/* Bars */}
          {data.map((d, i) => {
            const barHeight = (d.value / max) * innerH;
            const x = padding + 20 + i * (barWidth + barGap);
            const y = height - padding - 30 - barHeight;
            const isHovered = hoveredBar === i;
            const barColor = d.color || defaultColors[i % defaultColors.length];

            return (
              <g key={i}>
                {/* Bar */}
                <rect 
                  x={x} 
                  y={animated ? (height - padding - 30) : y}
                  width={barWidth} 
                  height={animated ? 0 : barHeight}
                  rx={6} 
                  ry={6} 
                  fill={barColor}
                  stroke={isHovered ? '#1f2937' : 'transparent'}
                  strokeWidth={isHovered ? 2 : 0}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isHovered ? 0.8 : 1,
                  }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {animated && (
                    <animate
                      attributeName="height"
                      from="0"
                      to={barHeight.toString()}
                      dur="0.8s"
                      begin={`${i * 0.1}s`}
                      fill="freeze"
                    />
                  )}
                  {animated && (
                    <animate
                      attributeName="y"
                      from={height - padding - 30}
                      to={y.toString()}
                      dur="0.8s"
                      begin={`${i * 0.1}s`}
                      fill="freeze"
                    />
                  )}
                </rect>
                
                {/* Label */}
                <text 
                  x={x + barWidth / 2} 
                  y={height - padding - 10} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fontWeight="500"
                  fill="#374151"
                >
                  {d.label}
                </text>
                
                {/* Value */}
                <text 
                  x={x + barWidth / 2} 
                  y={y - 8} 
                  textAnchor="middle" 
                  fontSize="11" 
                  fontWeight="600"
                  fill={isHovered ? '#1f2937' : '#6b7280'}
                >
                  {formatValue(d.value)}
                </text>

                {/* Hover tooltip */}
                {isHovered && d.description && (
                  <g>
                    <rect
                      x={x + barWidth / 2 - 60}
                      y={y - 40}
                      width={120}
                      height={25}
                      fill="#1f2937"
                      rx={4}
                      opacity={0.9}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 22}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                    >
                      {d.description}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {data.some(d => d.description) && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {data.map((d, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: d.color || defaultColors[i % defaultColors.length],
                }}
              />
              <span>{d.label}: {formatValue(d.value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}