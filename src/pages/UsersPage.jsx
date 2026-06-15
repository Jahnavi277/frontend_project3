import { useState, useEffect } from 'react'
import api from '../api/axios'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users')
      .then(res => { setUsers(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`)
    setUsers(users.filter(u => u.id !== id))
  }

  if (loading) return <p style={{ color: 'var(--text2)' }}>Loading...</p>

  return (
    <div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>All Users</span>
          <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', background: 'rgba(79,142,247,0.12)', color: 'var(--accent)' }}>
            {users.length} total
          </span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['ID', 'Name', 'Email', 'Role', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text3)', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ padding: '11px 20px', fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>{u.id}</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{u.name}</td>
                <td style={{ padding: '11px 20px', fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{u.email}</td>
                <td style={{ padding: '11px 20px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500',
                    background: u.role === 'ADMIN' ? 'rgba(167,139,250,0.12)' : 'rgba(79,142,247,0.12)',
                    color: u.role === 'ADMIN' ? 'var(--purple)' : 'var(--accent)'
                  }}>{u.role}</span>
                </td>
                <td style={{ padding: '11px 20px', borderBottom: '1px solid var(--border)' }}>
                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{
                      fontSize: '12px', padding: '4px 10px', borderRadius: '6px',
                      border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)',
                      color: 'var(--red)', cursor: 'pointer', fontFamily: 'var(--font)'
                    }}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage