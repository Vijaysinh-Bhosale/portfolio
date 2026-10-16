import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Truck, MapPin, Info, ArrowUpRight } from 'lucide-react';

interface MarketOption {
  market: string;
  distanceKm: number;
  marketPricePerQtl: number;
  transportPerKm: number;
}

const commodityData: Record<string, { basePrice: number; trend: { day: string; actual?: number; forecast?: number }[]; markets: MarketOption[] }> = {
  Soybean: {
    basePrice: 4850,
    trend: [
      { day: 'Day -3', actual: 4720 },
      { day: 'Day -2', actual: 4780 },
      { day: 'Day -1', actual: 4810 },
      { day: 'Today', actual: 4850, forecast: 4850 },
      { day: 'Day +1', forecast: 4890 },
      { day: 'Day +2', forecast: 4940 },
      { day: 'Day +3', forecast: 5010 },
      { day: 'Day +4', forecast: 5060 },
    ],
    markets: [
      { market: 'Latur APMC', distanceKm: 45, marketPricePerQtl: 4980, transportPerKm: 18 },
      { market: 'Solapur APMC', distanceKm: 110, marketPricePerQtl: 5090, transportPerKm: 16 },
      { market: 'Pune Market Yard', distanceKm: 240, marketPricePerQtl: 5250, transportPerKm: 14 },
      { market: 'Local Taluka Mandi', distanceKm: 15, marketPricePerQtl: 4700, transportPerKm: 22 },
    ],
  },
  Onion: {
    basePrice: 2200,
    trend: [
      { day: 'Day -3', actual: 2050 },
      { day: 'Day -2', actual: 2110 },
      { day: 'Day -1', actual: 2180 },
      { day: 'Today', actual: 2200, forecast: 2200 },
      { day: 'Day +1', forecast: 2260 },
      { day: 'Day +2', forecast: 2310 },
      { day: 'Day +3', forecast: 2340 },
      { day: 'Day +4', forecast: 2380 },
    ],
    markets: [
      { market: 'Lasalgaon Mandi', distanceKm: 180, marketPricePerQtl: 2490, transportPerKm: 15 },
      { market: 'Nashik APMC', distanceKm: 150, marketPricePerQtl: 2420, transportPerKm: 16 },
      { market: 'Pune Market Yard', distanceKm: 195, marketPricePerQtl: 2460, transportPerKm: 15 },
      { market: 'Local Taluka Mandi', distanceKm: 20, marketPricePerQtl: 2120, transportPerKm: 22 },
    ],
  },
  Wheat: {
    basePrice: 2850,
    trend: [
      { day: 'Day -3', actual: 2810 },
      { day: 'Day -2', actual: 2825 },
      { day: 'Day -1', actual: 2840 },
      { day: 'Today', actual: 2850, forecast: 2850 },
      { day: 'Day +1', forecast: 2870 },
      { day: 'Day +2', forecast: 2895 },
      { day: 'Day +3', forecast: 2920 },
      { day: 'Day +4', forecast: 2940 },
    ],
    markets: [
      { market: 'Nagpur APMC', distanceKm: 310, marketPricePerQtl: 3080, transportPerKm: 13 },
      { market: 'Akola APMC', distanceKm: 125, marketPricePerQtl: 2980, transportPerKm: 17 },
      { market: 'Amravati APMC', distanceKm: 190, marketPricePerQtl: 3010, transportPerKm: 15 },
      { market: 'Local Taluka Mandi', distanceKm: 18, marketPricePerQtl: 2790, transportPerKm: 22 },
    ],
  },
};

export const Crop2MarketDemo = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Soybean');
  const [quantityQtl, setQuantityQtl] = useState<number>(40);

  const currentCommodity = commodityData[selectedCrop];

  // Calculate net revenue for each market
  const rankedMarkets = currentCommodity.markets
    .map((m) => {
      const grossRevenue = m.marketPricePerQtl * quantityQtl;
      const totalFreight = m.distanceKm * m.transportPerKm;
      const netRevenue = grossRevenue - totalFreight;
      const netPerQtl = Math.round(netRevenue / quantityQtl);
      return {
        ...m,
        grossRevenue,
        totalFreight,
        netRevenue,
        netPerQtl,
      };
    })
    .sort((a, b) => b.netRevenue - a.netRevenue);

  const topMarket = rankedMarkets[0];

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-slate-200">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Interactive Engine Simulation
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">LSTM Price Engine v1.2</span>
        </div>
        <div className="flex items-center text-xs text-slate-400 gap-1 bg-dark-850 px-2.5 py-1 rounded-md border border-slate-800">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Illustrative market data for demo</span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-dark-950/60 p-4 rounded-lg border border-slate-800/60">
        <div>
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Select Commodity
          </label>
          <div className="flex gap-2">
            {Object.keys(commodityData).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  selectedCrop === crop
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-dark-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Harvest Volume
            </label>
            <span className="text-xs font-mono text-cyan-300 font-semibold">{quantityQtl} Quintals</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={quantityQtl}
            onChange={(e) => setQuantityQtl(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-dark-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>10 Qtl</span>
            <span>60 Qtl</span>
            <span>120 Qtl</span>
          </div>
        </div>
      </div>

      {/* Top Recommendation Highlight Card */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-cyan-950/40 via-dark-850 to-dark-850 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Optimal Net Profit Recommendation
              </span>
              <span className="text-[10px] font-mono bg-cyan-400/10 text-cyan-300 px-1.5 py-0.5 rounded">
                Rank #1
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mt-0.5">{topMarket.market}</h4>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{topMarket.distanceKm} km haul</span>
              <span>•</span>
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span>₹{topMarket.totalFreight.toLocaleString('en-IN')} freight overhead</span>
            </p>
          </div>
        </div>
        <div className="flex md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
          <span className="text-xs text-slate-400 font-mono">Projected Net Revenue</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
            ₹{topMarket.netRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            (₹{topMarket.netPerQtl}/qtl net yield)
          </span>
        </div>
      </div>

      {/* Chart & Ranked Market Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Price Trend Forecast (Recharts) */}
        <div className="lg:col-span-6 bg-dark-950/70 p-4 rounded-lg border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                7-Day Price Trajectory
              </span>
              <span className="text-xs text-slate-500">Historical modal price & LSTM projection</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Actual
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" /> Forecast
              </span>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentCommodity.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  domain={['dataMin - 100', 'dataMax + 100']}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b0f17',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(value: any, name: any) => [
                    `₹${value}/qtl`,
                    name === 'actual' ? 'Historical Modal' : 'LSTM Forecast',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#94a3b8' }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#22d3ee' }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-2 text-right">
            Confidence interval ±3.8% over 7-day horizon
          </p>
        </div>

        {/* Ranked Market Comparison Table */}
        <div className="lg:col-span-6 bg-dark-950/70 p-4 rounded-lg border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Regional Mandi Ranking
              </span>
              <span className="text-xs text-slate-500">Sorted by Net Revenue after Haulage</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="space-y-2">
            {rankedMarkets.map((item, idx) => {
              const isBest = idx === 0;
              return (
                <div
                  key={item.market}
                  className={`p-2.5 rounded-md border text-xs transition-colors flex items-center justify-between ${
                    isBest
                      ? 'bg-cyan-950/25 border-cyan-500/40'
                      : 'bg-dark-850/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] ${
                        isBest ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className={`font-semibold ${isBest ? 'text-white' : 'text-slate-300'}`}>
                        {item.market}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {item.distanceKm} km • Rate: ₹{item.marketPricePerQtl}/qtl
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-mono font-bold ${isBest ? 'text-cyan-300' : 'text-slate-200'}`}>
                      ₹{item.netRevenue.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      -₹{item.totalFreight} freight
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
