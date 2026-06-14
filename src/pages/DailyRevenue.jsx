import React, { useState, useEffect } from 'react';
import { CalendarDays, TrendingUp, DollarSign, Activity } from 'lucide-react';

const INITIAL_DATA = [
  { date: "01-May-26", isWeekend: false, total: 6688.63, inr: 25.47, usd: 71.34, eur: 0, gbp: 0, cad: 0 },
  { date: "02-May-26", isWeekend: true, total: 54.00, inr: 54.00, usd: 0, eur: 0, gbp: 0, cad: 0 },
  { date: "03-May-26", isWeekend: true, total: 28860.60, inr: 0, usd: 309.00, eur: 0, gbp: 0, cad: 0 },
  { date: "04-May-26", isWeekend: false, total: 4409.78, inr: 300.18, usd: 44.00, eur: 0, gbp: 0, cad: 0 },
  { date: "05-May-26", isWeekend: false, total: 25853.79, inr: 3470.00, usd: 167.21, eur: 62.64, gbp: 0, cad: 0 },
  { date: "06-May-26", isWeekend: false, total: 84246.09, inr: 12710.20, usd: 132.87, eur: 547.36, gbp: 0, cad: 0 },
  { date: "07-May-26", isWeekend: false, total: 33190.84, inr: 159.00, usd: 353.66, eur: 0, gbp: 0, cad: 0 },
  { date: "08-May-26", isWeekend: false, total: 30910.22, inr: 17575.50, usd: 142.77, eur: 0, gbp: 0, cad: 0 },
  { date: "09-May-26", isWeekend: true, total: 9074.74, inr: 0, usd: 97.16, eur: 0, gbp: 0, cad: 0 },
  { date: "10-May-26", isWeekend: true, total: 1457.00, inr: 1457.00, usd: 0, eur: 0, gbp: 0, cad: 0 },
  { date: "11-May-26", isWeekend: false, total: 1457.50, inr: 1457.50, usd: 0, eur: 0, gbp: 0, cad: 0 },
  { date: "12-May-26", isWeekend: false, total: 10527.67, inr: 1387.70, usd: 73.71, eur: 20.88, gbp: 0, cad: 0 },
  { date: "13-May-26", isWeekend: false, total: 14938.69, inr: 1788.90, usd: 140.79, eur: 0, gbp: 0, cad: 0 },
  { date: "14-May-26", isWeekend: false, total: 35547.34, inr: 2150.30, usd: 357.57, eur: 0, gbp: 0, cad: 0 },
  { date: "15-May-26", isWeekend: false, total: 16857.46, inr: 4812.60, usd: 128.96, eur: 0, gbp: 0, cad: 0 },
  { date: "16-May-26", isWeekend: true, total: 1077.11, inr: 32.90, usd: 11.18, eur: 0, gbp: 0, cad: 0 },
  { date: "17-May-26", isWeekend: true, total: 19544.88, inr: 0, usd: 209.26, eur: 0, gbp: 0, cad: 0 },
  { date: "18-May-26", isWeekend: false, total: 2821.90, inr: 2150.00, usd: 0, eur: 0, gbp: 0, cad: 10.00 },
  { date: "19-May-26", isWeekend: false, total: 4174.98, inr: 1237.50, usd: 18.96, eur: 10.80, gbp: 0, cad: 0 },
  { date: "20-May-26", isWeekend: false, total: 9862.99, inr: 1850.20, usd: 85.79, eur: 0, gbp: 0, cad: 0 },
  { date: "21-May-26", isWeekend: false, total: 19571.27, inr: 180.50, usd: 207.61, eur: 0, gbp: 0, cad: 0 },
  { date: "22-May-26", isWeekend: false, total: 13141.38, inr: 0, usd: 140.70, eur: 0, gbp: 0, cad: 0 },
  { date: "23-May-26", isWeekend: true, total: 23878.64, inr: 0, usd: 255.66, eur: 0, gbp: 0, cad: 0 },
  { date: "24-May-26", isWeekend: true, total: 0, inr: 0, usd: 0, eur: 0, gbp: 0, cad: 0 },
  { date: "25-May-26", isWeekend: false, total: 20439.95, inr: 3346.00, usd: 181.92, eur: 0.95, gbp: 0, cad: 0 },
  { date: "26-May-26", isWeekend: false, total: 5513.70, inr: 2213.00, usd: 34.62, eur: 0, gbp: 0, cad: 1.00 },
  { date: "27-May-26", isWeekend: false, total: 16163.41, inr: 2230.00, usd: 149.18, eur: 0, gbp: 0, cad: 0 },
  { date: "28-May-26", isWeekend: false, total: 8455.28, inr: 223.00, usd: 88.14, eur: 0, gbp: 0, cad: 0 },
  { date: "29-May-26", isWeekend: false, total: 26078.18, inr: 1075.00, usd: 267.70, eur: 0, gbp: 0, cad: 0 },
  { date: "30-May-26", isWeekend: true, total: 3295.15, inr: 0, usd: 35.28, eur: 0, gbp: 0, cad: 0 },
  { date: "31-May-26", isWeekend: true, total: 0, inr: 0, usd: 0, eur: 0, gbp: 0, cad: 0 },
];

const formatValue = (val, currency) => {
  if (val === 0 || val === undefined || val === null) return '—';
  const str = val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  switch (currency) {
    case 'INR': return `₹ ${str}`;
    case 'USD': return `$${str}`;
    case 'EUR': return `€ ${str}`;
    case 'GBP': return `£${str}`;
    case 'CAD': return `${str} $`;
    default: return str;
  }
};

export default function DailyRevenue() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
        const res = await fetch(`${baseUrl}/daily-revenues`);
        const data = await res.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setTableData(data.data);
        } else {
          // If empty, initialize with INITIAL_DATA
          const bulkRes = await fetch(`${baseUrl}/daily-revenues/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: INITIAL_DATA })
          });
          const bulkData = await bulkRes.json();
          if (bulkData.success && bulkData.data) {
            setTableData(bulkData.data);
          } else {
            setTableData(INITIAL_DATA);
          }
        }
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
        setTableData(INITIAL_DATA); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Loading ledger...</div>;
  }

  return (
    <div className="font-sans text-slate-900 pb-12 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/60 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-850 to-indigo-900 bg-clip-text text-transparent italic text-left">
              Daily Revenue Ledger
            </h1>
            <p className="text-slate-500 font-medium tracking-wide flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-indigo-600" />
              Detailed day-by-day currency breakdown and performance tracker.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/60 px-5 py-3 rounded-2xl border border-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">High Volume</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Target Met</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Weekend</span>
            </div>
          </div>
        </div>

        {/* Premium Ledger Table */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden relative border-t-4 border-t-indigo-600">
          <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-5 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm border border-indigo-100/50">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">May 2026 Transactions</h3>
          </div>

          <div className="overflow-x-auto custom-scrollbarThin">
            <table className="w-full text-right text-[13px] border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 border-r border-slate-200 text-left font-black text-slate-700 uppercase tracking-widest text-[11px] sticky left-0 bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    Date
                  </th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-indigo-700 bg-indigo-50/50 uppercase tracking-widest text-[11px]">
                    Total Revenue
                  </th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">INR</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">USD</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">EUR</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">GBP</th>
                  <th className="px-6 py-4 font-black text-slate-600 uppercase tracking-widest text-[11px]">CAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono font-medium">
                {tableData.map((row, idx) => {
                  const isBlue = row.total >= 50000;
                  const isGreen = row.total >= 15000 && row.total < 50000;
                  
                  let rowBg = "hover:bg-slate-50/60";
                  let dateBg = "bg-white text-slate-800";
                  let totalClass = "text-slate-800 font-bold";

                  if (isBlue) {
                    rowBg = "bg-blue-50/30 hover:bg-blue-50/50";
                    dateBg = "bg-blue-50 text-blue-700";
                    totalClass = "text-blue-700 font-extrabold bg-blue-50/30";
                  } else if (isGreen) {
                    rowBg = "bg-emerald-50/30 hover:bg-emerald-50/50";
                    dateBg = "bg-emerald-50 text-emerald-700";
                    totalClass = "text-emerald-700 font-extrabold bg-emerald-50/30";
                  } else if (row.isWeekend) {
                    rowBg = "bg-slate-50/80 hover:bg-slate-100/80";
                    dateBg = "bg-slate-100 text-slate-500";
                    totalClass = "text-slate-500";
                  }

                  return (
                    <tr key={idx} className={`transition-colors duration-150 ${rowBg}`}>
                      {/* Date Column */}
                      <td className={`px-6 py-3.5 border-r border-slate-200 text-left font-bold tracking-wider text-[12.5px] sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${dateBg}`}>
                        <div className="flex items-center justify-between">
                          <span>{row.date}</span>
                          {row.isWeekend && <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">Wknd</span>}
                        </div>
                      </td>
                      
                      {/* Total Column */}
                      <td className={`px-6 py-3.5 border-r border-slate-100 text-[13px] ${totalClass}`}>
                        {formatValue(row.total, 'INR')}
                      </td>
                      
                      {/* Value Columns */}
                      <td className={`px-6 py-3.5 border-r border-slate-50 text-[12.5px] ${row.inr ? 'text-slate-700' : 'text-slate-300'}`}>
                        {formatValue(row.inr, 'INR')}
                      </td>
                      <td className={`px-6 py-3.5 border-r border-slate-50 text-[12.5px] ${row.usd ? 'text-slate-700' : 'text-slate-300'}`}>
                        {formatValue(row.usd, 'USD')}
                      </td>
                      <td className={`px-6 py-3.5 border-r border-slate-50 text-[12.5px] ${row.eur ? 'text-slate-700' : 'text-slate-300'}`}>
                        {formatValue(row.eur, 'EUR')}
                      </td>
                      <td className={`px-6 py-3.5 border-r border-slate-50 text-[12.5px] ${row.gbp ? 'text-slate-700' : 'text-slate-300'}`}>
                        {formatValue(row.gbp, 'GBP')}
                      </td>
                      <td className={`px-6 py-3.5 text-[12.5px] ${row.cad ? 'text-slate-700' : 'text-slate-300'}`}>
                        {formatValue(row.cad, 'CAD')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbarThin::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbarThin::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .custom-scrollbarThin::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
      `}</style>
    </div>
  );
}
