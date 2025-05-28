
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

interface GraphProps {
  data: Array<{
    name: string;
    value: number;
    growth?: number;
  }>;
  type: 'line' | 'bar' | 'area';
  color?: string;
  title: string;
  startFromZero?: boolean;
}

export const Graph: React.FC<GraphProps> = ({ 
  data, 
  type, 
  color = '#9b87f5', 
  title, 
  startFromZero = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        {type === 'line' ? (
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
              domain={startFromZero ? [0, 'dataMax'] : ['dataMin', 'dataMax']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={4}
              dot={{ fill: color, strokeWidth: 3, r: 6 }}
              activeDot={{ r: 8, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
              domain={startFromZero ? [0, 'dataMax'] : ['dataMin', 'dataMax']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              fill="url(#areaGradient)" 
            />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666" 
              fontSize={12}
              tick={{ fill: '#666' }}
              domain={startFromZero ? [0, 'dataMax'] : ['dataMin', 'dataMax']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} 
            />
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)" 
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
