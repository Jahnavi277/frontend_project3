import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px',
      background: 'var(--bg2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '700' }}>A</span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: '700' }}>ANALYTIX</span>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '12px 8px' }}>
        <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', padding: '8px 12px' }}>Overview</div>

        <NavLink to="/dashboard" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
          borderRadius: '7px', textDecoration: 'none', fontSize: '13px',
          color: isActive ? 'var(--accent)' : 'var(--text2)',
          background: isActive ? 'rgba(79,142,247,0.12)' : 'transparent'
        })}>
          Dashboard
        </NavLink>

        <NavLink to="/logs" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
          borderRadius: '7px', textDecoration: 'none', fontSize: '13px',
          color: isActive ? 'var(--accent)' : 'var(--text2)',
          background: isActive ? 'rgba(79,142,247,0.12)' : 'transparent'
        })}>
          Logs
        </NavLink>

        <NavLink to="/search" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
          borderRadius: '7px', textDecoration: 'none', fontSize: '13px',
          color: isActive ? 'var(--accent)' : 'var(--text2)',
          background: isActive ? 'rgba(79,142,247,0.12)' : 'transparent'
        })}>
          Semantic Search
        </NavLink>

        {user?.role === 'ADMIN' && (
          <>
            <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text3)', padding: '8px 12px', marginTop: '8px' }}>Admin</div>
            <NavLink to="/users" style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
              borderRadius: '7px', textDecoration: 'none', fontSize: '13px',
              color: isActive ? 'var(--accent)' : 'var(--text2)',
              background: isActive ? 'rgba(79,142,247,0.12)' : 'transparent'
            })}>
              User Management
            </NavLink>
          </>
        )}
      </div>

      {/* User pill */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', background: 'var(--bg3)' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: 'white', flexShrink: 0 }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--text2)' }}>{user?.role}</div>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: '12px' }}>✕</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar