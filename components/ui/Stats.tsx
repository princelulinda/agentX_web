'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, subtitle, trend, icon }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
            )}
            {trend && (
              <p className={`text-xs mt-2 ${trend.positive ? 'text-green-500' : 'text-orange-500'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-orange-500/50 group-hover:text-orange-500 transition-colors duration-300">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
