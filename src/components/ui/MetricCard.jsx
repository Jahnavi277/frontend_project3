function MetricCard({ label, value, delta, deltaUp, color }) {
  const colors = {
    blue: 'var(--accent)',
    green: 'var(--green)',
    amber: 'var(--amber)',
    red: 'var(--red)'
  }

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: colors[color] || 'var(--accent)'
      }} />
      <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text2)', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '26px', fontWeight: '700', color: 'var(--text)', lineHeight: 1, marginBottom: '8px' }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontSize: '12px', color: deltaUp ? 'var(--green)' : 'var(--red)' }}>
          {deltaUp ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}

export default MetricCard