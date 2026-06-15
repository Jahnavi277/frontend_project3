import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import MetricCard from '../components/ui/MetricCard'
import ActivityChart from '../components/charts/ActivityChart'
import LogDistChart from '../components/charts/LogDistChart'

function DashboardPage() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/metrics')
      .then(res => {
        setMetrics(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ color: 'var(--text2)' }}>Loading...</p>
  if (!metrics.length) return <p style={{ color: 'var(--text2)' }}>No data found.</p>

  const latest = metrics[0]
  const totalErrors = metrics.reduce((sum, m) => sum + m.errorCount, 0)
  const avgCpu = (metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / metrics.length).toFixed(1)
  const avgMemory = (metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length).toFixed(1)

  return (
    <div>
      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <MetricCard label="Active Sessions" value={latest.activeSessions} delta="current" deltaUp={true} color="blue" />
        <MetricCard label="Total Requests" value={latest.totalRequests} delta="latest snapshot" deltaUp={true} color="green" />
        <MetricCard label="Avg CPU Usage" value={`${avgCpu}%`} delta="across all records" deltaUp={avgCpu < 70} color="amber" />
        <MetricCard label="Avg Memory" value={`${avgMemory}%`} delta="across all records" deltaUp={avgMemory < 75} color="red" />
        {user?.role === 'ADMIN' && (
          <MetricCard label="Total Errors" value={totalErrors} delta="across all records" deltaUp={false} color="red" />
        )}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>System Activity</span>
          </div>
          <ActivityChart metrics={metrics} />
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Request Distribution</span>
          </div>
          <LogDistChart metrics={metrics} />
        </div>
      </div>

      {/* Recent Metrics Table */}
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Recent Snapshots</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Timestamp', 'CPU %', 'Memory %', 'Sessions', 'Requests', user?.role === 'ADMIN' ? 'Errors' : null]
                .filter(Boolean)
                .map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text3)', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => (
              <tr key={m.id}>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)' }}>{new Date(m.timestamp).toLocaleString()}</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: m.cpuUsage > 80 ? 'var(--red)' : 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{m.cpuUsage}%</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: m.memoryUsage > 80 ? 'var(--amber)' : 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{m.memoryUsage}%</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{m.activeSessions}</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{m.totalRequests}</td>
                {user?.role === 'ADMIN' && <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--red)', borderBottom: '1px solid var(--border)' }}>{m.errorCount}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardPage