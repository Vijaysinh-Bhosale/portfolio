import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
} from 'recharts';
import { AlertTriangle, CheckCircle2, Cpu, Activity, Gauge, Info } from 'lucide-react';

interface SensorTelemetryPoint {
  time: string;
  rpm: number;
  torque: number;
  temp: number;
}

const normalTelemetry: SensorTelemetryPoint[] = [
  { time: '10:00', rpm: 1520, torque: 42.1, temp: 308.2 },
  { time: '10:05', rpm: 1535, torque: 41.8, temp: 308.4 },
  { time: '10:10', rpm: 1515, torque: 42.9, temp: 308.7 },
  { time: '10:15', rpm: 1540, torque: 43.2, temp: 309.1 },
  { time: '10:20', rpm: 1525, torque: 42.5, temp: 309.0 },
  { time: '10:25', rpm: 1530, torque: 42.8, temp: 309.2 },
];

const anomalyTelemetry: SensorTelemetryPoint[] = [
  { time: '10:00', rpm: 1520, torque: 42.1, temp: 308.2 },
  { time: '10:05', rpm: 1480, torque: 48.5, temp: 310.5 },
  { time: '10:10', rpm: 1420, torque: 56.2, temp: 313.8 },
  { time: '10:15', rpm: 1390, torque: 64.8, temp: 316.4 },
  { time: '10:20', rpm: 1340, torque: 72.1, temp: 319.1 },
  { time: '10:25', rpm: 1290, torque: 78.4, temp: 322.6 },
];

const shapFeaturesNormal = [
  { feature: 'Torque (Nm)', shapValue: 0.12, direction: 'neutral' },
  { feature: 'Tool Wear (min)', shapValue: 0.18, direction: 'neutral' },
  { feature: 'Rotational Speed', shapValue: -0.15, direction: 'protective' },
  { feature: 'Temp Diff (K)', shapValue: 0.08, direction: 'neutral' },
  { feature: 'Vibration RMS', shapValue: 0.05, direction: 'neutral' },
];

const shapFeaturesAnomaly = [
  { feature: 'Torque (Nm)', shapValue: 0.78, direction: 'risk' },
  { feature: 'Tool Wear (min)', shapValue: 0.65, direction: 'risk' },
  { feature: 'Temp Diff (K)', shapValue: 0.54, direction: 'risk' },
  { feature: 'Rotational Speed', shapValue: -0.42, direction: 'protective' },
  { feature: 'Vibration RMS', shapValue: 0.38, direction: 'risk' },
];

export const PredictiveMaintenanceDemo = () => {
  const [simulationState, setSimulationState] = useState<'normal' | 'anomaly'>('normal');

  const telemetry = simulationState === 'normal' ? normalTelemetry : anomalyTelemetry;
  const shapData = simulationState === 'normal' ? shapFeaturesNormal : shapFeaturesAnomaly;
  const failureRisk = simulationState === 'normal' ? 8.4 : 84.6;
  const failureType = simulationState === 'normal' ? 'Nominal Operation' : 'High Risk: Tool Wear & Heat Dissipation';

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-slate-200">
      {/* Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/80 text-blue-400 border border-blue-800/40">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Random Forest + SHAP Diagnostic
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">Telemetry Stream 100Hz</span>
        </div>
        <div className="flex items-center text-xs text-slate-400 gap-1 bg-dark-850 px-2.5 py-1 rounded-md border border-slate-800">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Illustrative sensor simulation</span>
        </div>
      </div>

      {/* Simulator Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-dark-950/60 p-3 rounded-lg border border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Simulate Operating Scenario:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSimulationState('normal')}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                simulationState === 'normal'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-dark-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              Standard Line (Nominal)
            </button>
            <button
              onClick={() => setSimulationState('anomaly')}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                simulationState === 'anomaly'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                  : 'bg-dark-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              Imminent Failure Run
            </button>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Latency: <span className="text-emerald-400">4.2ms</span> / Pydantic Validated
        </span>
      </div>

      {/* Real-time Status Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className={`p-4 rounded-lg border ${
          simulationState === 'normal'
            ? 'bg-emerald-950/20 border-emerald-500/30'
            : 'bg-rose-950/30 border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Machine Health</span>
            {simulationState === 'normal' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            )}
          </div>
          <div className={`text-xl font-bold font-mono ${
            simulationState === 'normal' ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {simulationState === 'normal' ? 'HEALTHY' : 'CRITICAL'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">{failureType}</div>
        </div>

        <div className="p-4 rounded-lg border border-slate-800 bg-dark-950/70">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Model Failure Probability</span>
            <Gauge className="w-4 h-4 text-blue-400" />
          </div>
          <div className={`text-xl font-bold font-mono ${
            failureRisk > 50 ? 'text-rose-400' : 'text-slate-200'
          }`}>
            {failureRisk}%
          </div>
          <div className="w-full bg-dark-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                failureRisk > 50 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${failureRisk}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-slate-800 bg-dark-950/70">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Current Telemetry Sample</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xs font-mono text-slate-300 space-y-0.5 mt-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Torque:</span>
              <span>{telemetry[telemetry.length - 1].torque} Nm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Speed:</span>
              <span>{telemetry[telemetry.length - 1].rpm} RPM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Process Temp:</span>
              <span>{telemetry[telemetry.length - 1].temp} K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizers: Telemetry Area Chart & SHAP Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Telemetry Chart */}
        <div className="lg:col-span-6 bg-dark-950/70 p-4 rounded-lg border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Torque & Temp Telemetry
              </span>
              <span className="text-xs text-slate-500">Real-time sensor sliding window</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/30">
              Sensor Channel 4
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="torqueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={simulationState === 'normal' ? '#38bdf8' : '#f43f5e'}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={simulationState === 'normal' ? '#38bdf8' : '#f43f5e'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b0f17',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: any) => [`${val} Nm`, 'Torque Load']}
                />
                <Area
                  type="monotone"
                  dataKey="torque"
                  stroke={simulationState === 'normal' ? '#38bdf8' : '#f43f5e'}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#torqueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
            <span>Critical threshold: &gt;68.0 Nm</span>
            <span className={simulationState === 'anomaly' ? 'text-rose-400 font-bold' : ''}>
              {simulationState === 'anomaly' ? 'THRESHOLD EXCEEDED' : 'Normal bounds'}
            </span>
          </div>
        </div>

        {/* SHAP Feature Importance Bars */}
        <div className="lg:col-span-6 bg-dark-950/70 p-4 rounded-lg border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                SHAP Feature Attribution
              </span>
              <span className="text-xs text-slate-500">Root-cause contribution to model score</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-dark-850 px-2 py-0.5 rounded border border-slate-700">
              TreeSHAP Explainer
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={shapData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={10} domain={[-0.6, 1.0]} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  width={95}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b0f17',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: any) => [`${Number(val).toFixed(2)}`, 'SHAP Impact']}
                />
                <Bar dataKey="shapValue" radius={[0, 4, 4, 0]}>
                  {shapData.map((entry, index) => {
                    let fill = '#38bdf8';
                    if (entry.shapValue > 0.5) fill = '#f43f5e';
                    else if (entry.shapValue < 0) fill = '#10b981';
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-2 text-right">
            Red/Blue indicates elevated risk contribution; Green indicates damping effect
          </p>
        </div>
      </div>
    </div>
  );
};
