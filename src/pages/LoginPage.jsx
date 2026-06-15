import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)'
    }}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)',
        borderRadius: '16px', padding: '48px 40px', width: '420px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '700' }}>A</span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '15px', fontWeight: '700' }}>ANALYTIX</span>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '6px' }}>Sign in</h1>
        <p style={{ color: 'var(--text2)', fontSize: '13px', marginBottom: '32px' }}>Access your analytics dashboard</p>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@company.com"
            style={{
              width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
              borderRadius: '8px', padding: '11px 14px', color: 'var(--text)',
              fontFamily: 'var(--font)', fontSize: '14px', outline: 'none'
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
              borderRadius: '8px', padding: '11px 14px', color: 'var(--text)',
              fontFamily: 'var(--font)', fontSize: '14px', outline: 'none'
            }}
          />
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            width: '100%', background: 'var(--accent)', color: 'white',
            border: 'none', borderRadius: '8px', padding: '12px',
            fontFamily: 'var(--font)', fontSize: '14px', fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Sign in →
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text2)' }}>
  Don't have an account?{' '}
  <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
    Create one
  </Link>
</p>
      </div>
    </div>
  )
}

export default LoginPage