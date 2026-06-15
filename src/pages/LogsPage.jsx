import { useState, useEffect } from 'react'
import api from '../api/axios'

const levelColors = {
  ERROR: { background: 'rgba(239,68,68,0.12)', color: 'var(--red)' },
  WARN:  { background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' },
  WARNING: { background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' },
  INFO:  { background: 'rgba(79,142,247,0.12)', color: 'var(--accent)' },
  DEBUG: { background: 'rgba(167,139,250,0.12)', color: 'var(--purple)' },
  FATAL: { background: 'rgba(239,68,68,0.18)', color: 'var(--red)' },
}

function LogsPage() {
  const [tab, setTab] = useState('event')         // 'event' or 'system'
  const [filter, setFilter] = useState('ALL')
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    setFilter('ALL')

    const endpoint = tab === 'event' ? '/event-logs' : '/system-logs'

    api.get(endpoint)
      .then(res => {
        setLogs(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch logs.')
        setLoading(false)
      })
  }, [tab])

  const filterKey  = tab === 'event' ? 'eventType' : 'level'
  const serviceKey = tab === 'event' ? 'service' : 'source'
  const filters    = tab === 'event'
    ? ['ALL', 'ERROR', 'WARNING', 'INFO', 'DEBUG']
    : ['ALL', 'ERROR', 'WARN', 'INFO', 'FATAL']

  const filtered = filter === 'ALL' ? logs : logs.filter(l => l[filterKey] === filter)

  const formatTime = ts => new Date(ts).toLocaleTimeString()

  return (
    <div>
      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {[['event', 'Event Logs'], ['system', 'System Logs']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              fontSize: '13px', padding: '7px 16px', borderRadius: '8px',
              border: '1px solid var(--border2)', cursor: 'pointer',
              fontFamily: 'var(--font)',
              background: tab === key ? 'var(--accent)' : 'var(--bg2)',
              color: tab === key ? 'white' : 'var(--text2)'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>
            {tab === 'event' ? 'Event Logs' : 'System Logs'}
          </span>
          <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', background: 'rgba(79,142,247,0.12)', color: 'var(--accent)' }}>
            Showing {filtered.length}
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontSize: '12px', padding: '5px 12px', borderRadius: '6px',
                border: '1px solid var(--border2)', cursor: 'pointer',
                fontFamily: 'var(--font)',
                background: filter === f ? 'rgba(79,142,247,0.12)' : 'var(--bg3)',
                color: filter === f ? 'var(--accent)' : 'var(--text2)'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <p style={{ padding: '24px 20px', color: 'var(--text2)', fontSize: '13px' }}>Loading...</p>
        )}
        {error && (
          <p style={{ padding: '24px 20px', color: 'var(--red)', fontSize: '13px' }}>{error}</p>
        )}

        {/* Table */}
        {!loading && !error && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Timestamp', 'Level', 'Service', 'Message'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text3)', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '24px 20px', color: 'var(--text2)', fontSize: '13px' }}>
                    No logs found.
                  </td>
                </tr>
              )}
              {filtered.map((log, i) => (
                <tr key={log._id || i}>
                  <td style={{ padding: '11px 20px', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>
                    {formatTime(log.timestamp)}
                  </td>
                  <td style={{ padding: '11px 20px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ ...(levelColors[log[filterKey]] || {}), fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--mono)', fontWeight: '700' }}>
                      {log[filterKey]}
                    </span>
                  </td>
                  <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>
                    {log[serviceKey]}
                  </td>
                  <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text)', borderBottom: '1px solid var(--border)', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default LogsPage