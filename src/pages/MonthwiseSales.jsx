import React, { useState, useEffect, useMemo } from 'react';
import {
  IndianRupee,
  Download,
  ArrowUpDown,
  FileSpreadsheet,
  RefreshCw,
  TrendingUp,
  Info,
  DollarSign,
  Plus,
  BarChart3
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

// Hardcoded initial seed data from the spreadsheet screenshot
const INITIAL_DATA = [
  {
    month: "APR",
    "2019-20": 99250.30,
    "2020-21": 369073.05,
    "2021-22": 96808.65,
    "2022-23": 294305.10,
    "2023-24": 495364.95,
    "2024-25": 267714.76,
    "2025-26": 390903.57,
    "2026-27": 601518.02,
    INR: 165959.50,
    USD: 4596.97,
    EUR: 16.70,
    GBP: 0.00,
    CAD: 65.45
  },
  {
    month: "MAY",
    "2019-20": 278919.13,
    "2020-21": 214550.08,
    "2021-22": 221083.94,
    "2022-23": 179947.73,
    "2023-24": 1311537.50,
    "2024-25": 452736.28,
    "2025-26": 362594.04,
    "2026-27": -499438.59,
    INR: -105479.50,
    USD: -4151.58,
    EUR: -16.70,
    GBP: 0.00,
    CAD: -65.45
  },
  {
    month: "JUN",
    "2019-20": 125307.83,
    "2020-21": 171600.88,
    "2021-22": 140204.55,
    "2022-23": 293767.31,
    "2023-24": 220594.09,
    "2024-25": 440856.45,
    "2025-26": 290404.76,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "JUL",
    "2019-20": 174217.58,
    "2020-21": 155590.08,
    "2021-22": 262429.57,
    "2022-23": 369300.14,
    "2023-24": 231765.04,
    "2024-25": 377241.78,
    "2025-26": 781152.04,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "AUG",
    "2019-20": 91737.42,
    "2020-21": 306046.35,
    "2021-22": 166005.85,
    "2022-23": 231648.94,
    "2023-24": 291793.74,
    "2024-25": 342091.71,
    "2025-26": 384723.15,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "SEP",
    "2019-20": 101813.01,
    "2020-21": 202545.10,
    "2021-22": 303780.77,
    "2022-23": 542815.77,
    "2023-24": 261972.16,
    "2024-25": 320448.26,
    "2025-26": 659429.68,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "OCT",
    "2019-20": 112390.57,
    "2020-21": 284226.18,
    "2021-22": 306334.23,
    "2022-23": 403237.48,
    "2023-24": 257182.94,
    "2024-25": 236339.24,
    "2025-26": 241511.48,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "NOV",
    "2019-20": 232622.98,
    "2020-21": 202578.61,
    "2021-22": 387941.07,
    "2022-23": 449354.37,
    "2023-24": 261838.66,
    "2024-25": 212031.47,
    "2025-26": 468364.34,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "DEC",
    "2019-20": 228805.87,
    "2020-21": 490590.13,
    "2021-22": 257055.04,
    "2022-23": 325762.29,
    "2023-24": 131137.90,
    "2024-25": 248578.48,
    "2025-26": 573831.16,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "JAN",
    "2019-20": 199200.60,
    "2020-21": 281858.51,
    "2021-22": 191778.64,
    "2022-23": 485624.46,
    "2023-24": 190225.24,
    "2024-25": 384947.56,
    "2025-26": 341935.60,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "FEB",
    "2019-20": 108338.71,
    "2020-21": 463444.70,
    "2021-22": 448900.11,
    "2022-23": 1578955.78,
    "2023-24": 229917.76,
    "2024-25": 334095.04,
    "2025-26": 418610.54,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  },
  {
    month: "MAR",
    "2019-20": 229472.26,
    "2020-21": 305405.36,
    "2021-22": 246393.37,
    "2022-23": 942721.83,
    "2023-24": 264212.00,
    "2024-25": 463602.63,
    "2025-26": 466457.85,
    "2026-27": 0.00,
    INR: 0.00,
    USD: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    CAD: 0.00
  }
];

export default function MonthwiseSales() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null); // { rowIndex, colKey }
  const [tempValue, setTempValue] = useState('');
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
        const res = await fetch(`${baseUrl}/monthwise-sales`);
        const data = await res.json();
        
        if (data.success && data.data && data.data.length > 0) {
          setSalesData(data.data);
        } else {
          // If empty, initialize with INITIAL_DATA
          const bulkRes = await fetch(`${baseUrl}/monthwise-sales/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: INITIAL_DATA })
          });
          const bulkData = await bulkRes.json();
          if (bulkData.success && bulkData.data) {
            setSalesData(bulkData.data);
          } else {
            setSalesData(INITIAL_DATA);
          }
        }
      } catch (error) {
        console.error("Error fetching monthwise sales:", error);
        setSalesData(INITIAL_DATA); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  // Year columns list
  const years = ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25", "2025-26", "2026-27"];
  const currencies = ["INR", "USD", "EUR", "GBP", "CAD"];

  // Custom Formatter matching the user's Excel style precisely
  const formatCell = (val, colKey) => {
    if (val === undefined || val === null) return '—';
    const isNegative = val < 0;
    const absVal = Math.abs(val);

    const formattedNum = absVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedUSNum = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (years.includes(colKey) || colKey === 'INR') {
      return isNegative ? `₹ -${formattedNum}` : `₹ ${formattedNum}`;
    }
    if (colKey === 'USD') {
      return isNegative ? `-$${formattedUSNum}` : `$${formattedUSNum}`;
    }
    if (colKey === 'EUR') {
      return isNegative ? `-€ ${formattedUSNum}` : `€ ${formattedUSNum}`;
    }
    if (colKey === 'GBP') {
      return isNegative ? `-£${formattedUSNum}` : `£${formattedUSNum}`;
    }
    if (colKey === 'CAD') {
      return isNegative ? `-${formattedUSNum} $` : `${formattedUSNum} $`;
    }
    return val;
  };

  // Calculations for Column Totals
  const colTotals = useMemo(() => {
    const totals = {};
    [...years, ...currencies].forEach(col => {
      totals[col] = salesData.reduce((acc, row) => acc + (Number(row[col]) || 0), 0);
    });
    return totals;
  }, [salesData]);

  // Overall KPI sums
  const currentYearTotal = colTotals["2026-27"];
  const lastYearTotal = colTotals["2025-26"];
  const growthRate = useMemo(() => {
    if (!lastYearTotal) return 0;
    return ((currentYearTotal - lastYearTotal) / lastYearTotal) * 100;
  }, [currentYearTotal, lastYearTotal]);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total Revenue',
        data: years.map(y => colTotals[y]),
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        hoverBackgroundColor: 'rgba(79, 70, 229, 1)',
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        titleFont: { size: 14, weight: 'bold', family: 'Inter, sans-serif' },
        bodyFont: { size: 13, family: 'Inter, sans-serif' },
        padding: 14,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) => formatCell(context.raw, context.label)
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(226, 232, 240, 0.6)', drawBorder: false, borderDash: [5, 5] },
        ticks: { color: '#64748b', font: { family: 'Inter, sans-serif', size: 11, weight: '500' } }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#475569', font: { family: 'Inter, sans-serif', weight: 'bold', size: 12 } }
      }
    }
  };

  const handleCellDoubleClick = (rowIndex, colKey, value) => {
    setEditingCell({ rowIndex, colKey });
    setTempValue(value.toString());
  };

  const handleCellSave = async () => {
    if (editingCell) {
      const { rowIndex, colKey } = editingCell;
      const numVal = parseFloat(tempValue);
      if (!isNaN(numVal)) {
        const newData = [...salesData];
        const updatedRow = {
          ...newData[rowIndex],
          [colKey]: numVal
        };
        newData[rowIndex] = updatedRow;
        setSalesData(newData);
        
        if (updatedRow._id) {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
            await fetch(`${baseUrl}/monthwise-sales/${updatedRow._id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedRow)
            });
          } catch (error) {
            console.error("Error saving cell:", error);
          }
        }
      }
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  // Reset to original data
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all custom edits to the original spreadsheet data?")) {
      setSalesData(INITIAL_DATA);
    }
  };

  // Export to CSV
  const handleExport = () => {
    const headers = ["Month", ...years, ...currencies].join(",");
    const rows = salesData.map(row => {
      return [
        row.month,
        ...years.map(y => row[y]),
        ...currencies.map(c => row[c])
      ].join(",");
    });

    // Add total row
    const totalRow = [
      "Total",
      ...years.map(y => colTotals[y]),
      ...currencies.map(c => colTotals[c])
    ].join(",");

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows, totalRow].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthwise_sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Loading ledger...</div>;
  }

  return (
    <div className="font-sans text-slate-900 pb-12 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Premium Revenue Chart */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl p-6 md:p-8 hover:shadow-indigo-50/50 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl text-indigo-600 shadow-sm border border-indigo-100/50">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Yearly Revenue Trends</h3>
              <p className="text-sm font-medium text-slate-500 mt-0.5">Historical growth breakdown across financial years</p>
            </div>
          </div>
          <div className="h-[320px] w-full mt-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Premium Ledger Spreadsheet Grid */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden relative border-t-4 border-t-indigo-600">
          <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Monthly Sales Ledger</h3>
            </div>
            <div className="flex gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
              <span>Selected Breakdown Year:</span>
              <span className="text-indigo-600 font-black">2026-27</span>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbarThin">
            <table className="w-full text-right text-[13px] border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {/* Month header column */}
                  <th className="px-5 py-4 border-r border-slate-200 text-left font-black text-slate-700 uppercase tracking-widest text-[11px] w-24 sticky left-0 bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    Month
                  </th>

                  {/* Financial Years */}
                  {years.map(year => (
                    <th
                      key={year}
                      onMouseEnter={() => setHighlightedCol(year)}
                      onMouseLeave={() => setHighlightedCol(null)}
                      className={`px-5 py-4 border-r border-slate-200 font-black text-slate-700 uppercase tracking-widest text-[11px] transition-colors duration-200 ${year === '2026-27' ? 'bg-indigo-50/50 text-indigo-700' : ''
                        } ${highlightedCol === year ? 'bg-indigo-50' : ''}`}
                    >
                      {year}
                    </th>
                  ))}

                  {/* Currencies */}
                  {currencies.map(cur => (
                    <th
                      key={cur}
                      onMouseEnter={() => setHighlightedCol(cur)}
                      onMouseLeave={() => setHighlightedCol(null)}
                      className={`px-5 py-4 border-r border-slate-200 font-black text-slate-600 uppercase tracking-widest text-[11px] transition-colors duration-200 ${highlightedCol === cur ? 'bg-indigo-50' : ''
                        }`}
                    >
                      {cur}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono font-medium">
                {salesData.map((row, rowIndex) => {
                  const isHighlightedRow = highlightedRow === rowIndex;
                  return (
                    <tr
                      key={row.month}
                      onMouseEnter={() => setHighlightedRow(rowIndex)}
                      onMouseLeave={() => setHighlightedRow(null)}
                      className={`hover:bg-slate-50/40 transition-colors duration-150 ${isHighlightedRow ? 'bg-indigo-50/10' : ''
                        }`}
                    >
                      {/* Month Column */}
                      <td className="px-5 py-4 border-r border-slate-200 text-left font-black text-slate-800 tracking-wider text-[12px] bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-between">
                          <span>{row.month}</span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded uppercase font-sans tracking-tighter">FY</span>
                        </div>
                      </td>

                      {/* Year Cells */}
                      {years.map(year => {
                        const cellVal = row[year];
                        const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.colKey === year;
                        const isHighlightedCol = highlightedCol === year;

                        // Check if this is the highlighted current year cell from screenshot (APR 2026-27)
                        const isSpecialCell = row.month === 'APR' && year === '2026-27';

                        return (
                          <td
                            key={year}
                            onDoubleClick={() => handleCellDoubleClick(rowIndex, year, cellVal)}
                            onMouseEnter={() => setHighlightedCol(year)}
                            onMouseLeave={() => setHighlightedCol(null)}
                            className={`px-4 py-3.5 border-r border-slate-100 transition-all cursor-pointer relative text-right text-[12.5px] ${isSpecialCell
                              ? 'bg-indigo-600 text-white font-extrabold shadow-inner rounded-md scale-[0.98]'
                              : cellVal < 0
                                ? 'text-rose-600 font-bold bg-rose-50/30'
                                : 'text-slate-700'
                              } ${isHighlightedCol && !isSpecialCell ? 'bg-indigo-50/20' : ''
                              } ${isEditing ? 'p-1' : ''
                              }`}
                          >
                            {isEditing ? (
                              <input
                                autoFocus
                                type="text"
                                className="w-full px-2 py-1 text-right bg-white border-2 border-indigo-500 rounded font-mono text-[12.5px] text-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-md"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                onBlur={handleCellSave}
                                onKeyDown={handleKeyDown}
                              />
                            ) : (
                              formatCell(cellVal, year)
                            )}
                          </td>
                        );
                      })}

                      {/* Currency Cells */}
                      {currencies.map(cur => {
                        const cellVal = row[cur];
                        const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.colKey === cur;
                        const isHighlightedCol = highlightedCol === cur;

                        return (
                          <td
                            key={cur}
                            onDoubleClick={() => handleCellDoubleClick(rowIndex, cur, cellVal)}
                            onMouseEnter={() => setHighlightedCol(cur)}
                            onMouseLeave={() => setHighlightedCol(null)}
                            className={`px-4 py-3.5 border-r border-slate-100 transition-all cursor-pointer relative text-right text-[12.5px] ${cellVal < 0
                              ? 'text-rose-600 font-bold bg-rose-50/30'
                              : 'text-slate-600'
                              } ${isHighlightedCol ? 'bg-indigo-50/20' : ''
                              } ${isEditing ? 'p-1' : ''
                              }`}
                          >
                            {isEditing ? (
                              <input
                                autoFocus
                                type="text"
                                className="w-full px-2 py-1 text-right bg-white border-2 border-indigo-500 rounded font-mono text-[12.5px] text-slate-850 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-md"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                onBlur={handleCellSave}
                                onKeyDown={handleKeyDown}
                              />
                            ) : (
                              formatCell(cellVal, cur)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="bg-slate-50 font-black border-t-2 border-slate-300">
                  <td className="px-5 py-5 border-r border-slate-200 text-left font-black text-slate-800 tracking-wider text-[12px] bg-slate-50 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    TOTAL
                  </td>

                  {/* Year Totals */}
                  {years.map(year => {
                    const totalVal = colTotals[year];
                    const isHighlightedCol = highlightedCol === year;
                    return (
                      <td
                        key={year}
                        onMouseEnter={() => setHighlightedCol(year)}
                        onMouseLeave={() => setHighlightedCol(null)}
                        className={`px-4 py-5 border-r border-slate-200 text-slate-900 text-right text-[13px] transition-colors duration-200 ${year === '2026-27' ? 'bg-indigo-50/50 text-indigo-800 font-extrabold' : ''
                          } ${isHighlightedCol ? 'bg-indigo-100/30' : ''}`}
                      >
                        {formatCell(totalVal, year)}
                      </td>
                    );
                  })}

                  {/* Currency Totals */}
                  {currencies.map(cur => {
                    const totalVal = colTotals[cur];
                    const isHighlightedCol = highlightedCol === cur;
                    return (
                      <td
                        key={cur}
                        onMouseEnter={() => setHighlightedCol(cur)}
                        onMouseLeave={() => setHighlightedCol(null)}
                        className={`px-4 py-5 border-r border-slate-200 text-slate-800 text-right text-[13px] transition-colors duration-200 ${isHighlightedCol ? 'bg-indigo-100/30' : ''
                          }`}
                      >
                        {formatCell(totalVal, cur)}
                      </td>
                    );
                  })}
                </tr>
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
