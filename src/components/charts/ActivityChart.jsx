import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function ActivityChart({ metrics }) {
  const labels = metrics.map(m => new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Requests',
        data: metrics.map(m => m.totalRequests),
        borderColor: '#4f8ef7',
        backgroundColor: 'rgba(79,142,247,0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: 3
      },
      {
        label: 'Active Sessions',
        data: metrics.map(m => m.activeSessions),
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
        pointRadius: 3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#7c8396', font: { size: 11 }, boxWidth: 12 }
      }
    },
    scales: {
      x: { ticks: { color: '#4a4f61', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#4a4f61', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } }
    }
  }

  return (
    <div style={{ position: 'relative', height: '200px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default ActivityChart