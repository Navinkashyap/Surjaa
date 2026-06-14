import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRightLeft, Target } from 'lucide-react';

const INITIAL_DATA = [
  {
    quarter: "Q1",
    label: "Quarter 1",
    qBg: "bg-indigo-50/60 text-indigo-700",
    isOdd: true,
    months: [
      { name: "APR", values: [ { val: 102079.43, curr: '₹', pos: 'pre' }, { val: 60480.00, curr: '₹', pos: 'pre' }, { val: 445.39, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "MAY", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "JUN", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] }
    ]
  },
  {
    quarter: "Q2",
    label: "Quarter 2",
    qBg: "bg-emerald-50/60 text-emerald-700",
    isOdd: false,
    months: [
      { name: "JUL", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "AUG", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "SEP", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] }
    ]
  },
  {
    quarter: "Q3",
    label: "Quarter 3",
    qBg: "bg-indigo-50/60 text-indigo-700",
    isOdd: true,
    months: [
      { name: "OCT", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "NOV", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "DEC", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] }
    ]
  },
  {
    quarter: "Q4",
    label: "Quarter 4",
    qBg: "bg-emerald-50/60 text-emerald-700",
    isOdd: false,
    months: [
      { name: "JAN", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "FEB", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] },
      { name: "MAR", values: [ { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '₹', pos: 'pre' }, { val: 0, curr: '$', pos: 'pre' }, { val: 0, curr: '€', pos: 'pre' }, { val: 0, curr: '£', pos: 'pre' }, { val: 0, curr: '$', pos: 'post' } ] }
    ]
  }
];

const formatVal = (val, curr, pos) => {
  if (val === 0 || val === undefined || val === null) return '—';
  const numStr = val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (pos === 'pre') {
    return `${curr === '$' || curr === '£' ? curr : curr + ' '}${numStr}`;
  }
  return `${numStr} ${curr}`;
};

export default function YearwiseFinance() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
        const res = await fetch(`${baseUrl}/yearwise-finances`);
        const data = await res.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setTableData(data.data);
        } else {
          // If empty, initialize with INITIAL_DATA
          const bulkRes = await fetch(`${baseUrl}/yearwise-finances/bulk`, {
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
        console.error("Error fetching yearwise finance:", error);
        setTableData(INITIAL_DATA); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
              Quarterly Revenue Hub
            </h1>
            <p className="text-slate-500 font-medium tracking-wide flex items-center gap-2">
              <Landmark className="w-4 h-4 text-indigo-600" />
              FY 2026-27 detailed currency-wise financial breakdown.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/60 px-5 py-3 rounded-2xl border border-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Q1 / Q3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Q2 / Q4</span>
            </div>
          </div>
        </div>

        {/* Premium Ledger Table */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden relative border-t-4 border-t-indigo-600">
          <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm border border-indigo-100/50">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Currency Flow Ledger</h3>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbarThin">
            <table className="w-full text-right text-[13px] border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 border-r border-slate-200 text-left font-black text-slate-700 uppercase tracking-widest text-[11px] sticky left-0 bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] w-24">
                    Month
                  </th>
                  <th className="px-6 py-4 border-r border-slate-200 text-center font-black text-slate-700 uppercase tracking-widest text-[11px] w-24">
                    Quarter
                  </th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-indigo-700 bg-indigo-50/50 uppercase tracking-widest text-[11px]">
                    Total (10)
                  </th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">INR</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">USD</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">EUR</th>
                  <th className="px-6 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px]">GBP</th>
                  <th className="px-6 py-4 font-black text-slate-600 uppercase tracking-widest text-[11px]">CAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono font-medium">
                {tableData.map((qData, qIndex) => (
                  <React.Fragment key={qIndex}>
                    {qData.months.map((m, mIndex) => {
                      const isFirstMonth = mIndex === 0;
                      
                      return (
                        <tr key={mIndex} className="hover:bg-slate-50/60 transition-colors duration-150">
                          {/* Month Column */}
                          <td className="px-6 py-4 border-r border-slate-200 text-left font-bold tracking-wider text-[12.5px] bg-white sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] text-slate-800">
                            {m.name}
                          </td>
                          
                          {/* Quarter Column (only on first month of quarter) */}
                          {isFirstMonth && (
                            <td rowSpan={3} className={`px-6 py-4 border-r border-b border-slate-200 text-center font-black tracking-widest text-lg shadow-inner ${qData.qBg}`}>
                              <div className="flex flex-col items-center justify-center gap-1">
                                <span>{qData.quarter}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 bg-white/50 px-2 py-0.5 rounded-md">{qData.label}</span>
                              </div>
                            </td>
                          )}

                          {/* Values Columns */}
                          {m.values.map((v, vIndex) => {
                            const isTotalCol = vIndex === 0;
                            const hasValue = v.val !== 0 && v.val !== undefined && v.val !== null;
                            
                            // Highlight the total column subtly
                            const colBgClass = isTotalCol ? 'bg-indigo-50/10' : 'bg-white';
                            const colTextClass = hasValue 
                              ? (isTotalCol ? 'text-indigo-700 font-bold' : 'text-slate-800 font-semibold') 
                              : 'text-slate-300';
                            
                            return (
                              <td key={vIndex} className={`px-6 py-4 border-r border-slate-50 text-[13px] ${colBgClass} ${colTextClass}`}>
                                {formatVal(v.val, v.curr, v.pos)}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
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
