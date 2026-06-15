import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const titles = {
  '/dashboard': 'Dashboard',
  '/logs': 'Logs',
  '/search': 'Semantic Search',
  '/users': 'User Management'
}

function Topbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const title = titles[location.pathname] || 'Dashboard'

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate('/search', { state: { query } })
    }
  }

  return (
    <div style={{
      height: '56px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: '16px',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text)', flex: 1 }}>
        {title}
      </span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--bg2)', border: '1px solid var(--border2)',
        borderRadius: '8px', padding: '7px 12px', width: '260px'
      }}>
        <span style={{ fontSize: '13px', color: 'var(--text3)' }}>🔍</span>
        <input
          placeholder="Quick search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          style={{
            background: 'none', border: 'none', outline: 'none',
            fontFamily: 'var(--font)', fontSize: '13px',
            color: 'var(--text)', width: '100%'
          }}
        />
      </div>
    </div>
  )
}

export default Topbar