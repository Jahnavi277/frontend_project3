import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DUMMY_RESULTS = [
  { level: 'ERROR', service: 'core-service', msg: 'CPU usage spike: 94% for 45 seconds', time: '14:18:33', score: 0.97 },
  { level: 'WARN',  service: 'gateway',      msg: 'High latency detected on /api/metrics endpoint', time: '14:22:45', score: 0.91 },
  { level: 'WARN',  service: 'core-service', msg: 'Memory usage at 82% — approaching threshold', time: '14:15:44', score: 0.88 },
  { level: 'INFO',  service: 'core-service', msg: 'Metrics summary snapshot saved successfully', time: '14:19:55', score: 0.74 },
  { level: 'WARN',  service: 'node-logs',    msg: 'MongoDB write latency above threshold: 420ms', time: '14:20:12', score: 0.69 },
]

const levelColors = {
  ERROR: { background: 'rgba(239,68,68,0.12)', color: 'var(--red)' },
  WARN:  { background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' },
  INFO:  { background: 'rgba(79,142,247,0.12)', color: 'var(--accent)' },
}

const EXAMPLE_QUERIES = [
  'High CPU usage events',
  'System errors in last activity',
  'Login related errors',
  'Database connection issues',
  'Recent system failures'
]

function SearchPage() {
  const location = useLocation()
  const [query, setQuery] = useState(location.state?.query || '')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (location.state?.query) {
      setResults(DUMMY_RESULTS)
      setSearched(true)
    }
  }, [])

  const handleSearch = () => {
    if (!query.trim()) return
    setResults(DUMMY_RESULTS)
    setSearched(true)
  }

  return (
    <div style={{ maxWidth: '720px' }}>

      {/* Search Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. High CPU usage events, Recent system failures..."
          style={{
            flex: 1, background: 'var(--bg2)', border: '1px solid var(--border2)',
            borderRadius: '10px', padding: '12px 16px', color: 'var(--text)',
            fontFamily: 'var(--font)', fontSize: '14px', outline: 'none'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: 'var(--accent)', color: 'white', border: 'none',
            borderRadius: '10px', padding: '12px 20px', fontFamily: 'var(--font)',
            fontSize: '14px', fontWeight: '500', cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      {/* Example Queries */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {EXAMPLE_QUERIES.map(q => (
          <span
            key={q}
            onClick={() => { setQuery(q); setResults(DUMMY_RESULTS); setSearched(true) }}
            style={{
              fontSize: '12px', padding: '6px 12px', borderRadius: '20px',
              border: '1px solid var(--border2)', background: 'var(--bg2)',
              color: 'var(--text2)', cursor: 'pointer'
            }}
          >
            {q}
          </span>
        ))}
      </div>

      {/* Results */}
      {searched && (
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '14px' }}>
            Semantic results for "<span style={{ color: 'var(--text)' }}>{query}</span>" — {results.length} matches found
          </p>
          {results.map((r, i) => (
            <div key={i} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '14px 18px', marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text3)' }}>{r.service} · {r.time}</span>
                <span style={{ fontSize: '11px', color: 'var(--green)', fontFamily: 'var(--mono)' }}>score: {r.score.toFixed(2)}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '6px' }}>{r.msg}</div>
              <span style={{ ...levelColors[r.level], fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--mono)', fontWeight: '700' }}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchPage