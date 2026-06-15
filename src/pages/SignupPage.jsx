import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async () => {
    setError('')
    setSuccess('')
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/register', { name, email, password, role })
      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
    borderRadius: '8px', padding: '11px 14px', color: 'var(--text)',
    fontFamily: 'var(--font)', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: '500', color: 'var(--text2)',
    textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '48px 40px', width: '420px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '700' }}>A</span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '15px', fontWeight: '700' }}>ANALYTIX</span>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '6px' }}>Create account</h1>
        <p style={{ color: 'var(--text2)', fontSize: '13px', marginBottom: '32px' }}>Start monitoring your analytics dashboard</p>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleSignup()} style={inputStyle} />
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}
        {success && <p style={{ color: 'var(--green)', fontSize: '12px', marginBottom: '12px' }}>{success}</p>}

        <button onClick={handleSignup} disabled={loading} style={{
          width: '100%', background: loading ? 'var(--bg3)' : 'var(--accent)',
          color: loading ? 'var(--text2)' : 'white', border: 'none', borderRadius: '8px',
          padding: '12px', fontFamily: 'var(--font)', fontSize: '14px', fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'Creating account...' : 'Create account →'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text2)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage