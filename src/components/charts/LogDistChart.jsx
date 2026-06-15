import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function LogDistChart({ metrics }) {
  const totalErrors = metrics.reduce((sum, m) => sum + m.errorCount, 0)
  const totalRequests = metrics.reduce((sum, m) => sum + m.totalRequests, 0)
  const totalNormal = totalRequests - totalErrors

  const data = {
    labels: ['Normal', 'Errors'],
    datasets: [
      {
        data: [totalNormal, totalErrors],
        backgroundColor: ['#4f8ef7', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#7c8396', font: { size: 11 }, boxWidth: 12, padding: 14 }
      }
    },
    cutout: '68%'
  }

  return (
    <div style={{ position: 'relative', height: '200px' }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default LogDistChart