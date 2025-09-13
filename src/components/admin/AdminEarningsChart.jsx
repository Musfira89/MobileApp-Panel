import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const AdminEarningsChart = () => {
  const chartRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState('All');

  const reservationsByMonth = {
    Jan: [6000, 7500, 10000, 5200, 6800, 5500, 8000, 9200, 5000, 7000, 6300, 7100, 8100, 9400, 5600, 5800, 6700, 6900, 7400, 8500],
    Feb: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100, 8100, 9400],
    Mar: [6000, 7500, 10000, 5200, 6800, 5500, 8000, 7100, 8100, 9400, 5600, 5800, 6700, 6900, 7400, 8500],
    Apr: [6000, 7500, 10000, 5200, 6800, 5500, 8000, 9200, 5000, 7000, 6300, 7100, 8100, 9400, 5600, 5800, 6700, 6900, 7400, 8500],
    May: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100],
    Jun: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100],
    Jul: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100],
    Aug: [6000, 7500, 10000, 5200, 6800, 5500, 8000, 9200, 5000, 7000, 6300, 7100, 8100, 9400, 5600, 5800, 6700, 6900, 7400, 8500],
    Sep: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100],
    Oct: [8200, 5300, 9100, 5600, 7900, 8800, 9900, 10500, 5000, 6100],
  };

  const months = Object.keys(reservationsByMonth);

  // Processed monthly earnings data
  const fullData = months.map((month) => {
    const earnings = reservationsByMonth[month].reduce((sum, val) => sum + val * 0.1, 0);
    return { month, earnings };
  });

  const filteredData = selectedMonth === 'All'
    ? fullData
    : fullData.filter((d) => d.month === selectedMonth);

  const labels = filteredData.map((d) => d.month);
  const commissionData = filteredData.map((d) => d.earnings);

  const data = {
    labels,
    datasets: [
      {
        label: 'Earnings (10% Commission)',
        data: commissionData,
        fill: true,
        borderWidth: 2.5,
        borderColor: '#DC2626',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(220, 38, 38, 0.3)');
          gradient.addColorStop(0.6, 'rgba(220, 38, 38, 0.05)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#DC2626',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          afterBody: (tooltipItems) => {
            const current = tooltipItems[0]?.parsed.y || 0;
            const prev = tooltipItems[0]?.dataIndex > 0
              ? tooltipItems[0].dataset.data[tooltipItems[0].dataIndex - 1]
              : null;

            if (prev !== null) {
              const diff = current - prev;
              const pct = ((diff / prev) * 100).toFixed(1);
              const direction = diff >= 0 ? '↑' : '↓';
              return ` ${direction} ${Math.abs(pct)}% compared to previous`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#6B7280', font: { size: 12 } },
        grid: { color: '#E5E7EB' }
      },
      x: {
        ticks: { color: '#6B7280', font: { size: 12 } },
        grid: { display: false }
      }
    }
  };

  // PDF export handler
  const handleExportPDF = async () => {
    const canvas = await html2canvas(chartRef.current.canvas);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
    pdf.save('revenue-chart.pdf');
  };

  // CSV export handler
  const handleExportCSV = () => {
    const rows = [['Month', 'Earnings']];
    filteredData.forEach((d) => rows.push([d.month, d.earnings.toFixed(2)]));
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'revenue.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      {/* Top section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">REVENUE</p>
          <h2 className="text-3xl font-bold text-red-600 flex items-center">
            ↑ 78%
            <span className="text-sm font-medium ml-2 text-red-500">+14</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 text-xs px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="All">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <button
            onClick={handleExportPDF}
            className="bg-red-700 text-white text-xs px-4 py-1.5 rounded-md hover:bg-red-700 transition"
          >
            Export PDF
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Chart */}
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default AdminEarningsChart;
