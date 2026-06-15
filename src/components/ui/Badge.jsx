function Badge({ text, type }) {
  const styles = {
    green: { background: 'rgba(34,197,94,0.12)', color: 'var(--green)' },
    red:   { background: 'rgba(239,68,68,0.12)', color: 'var(--red)' },
    blue:  { background: 'rgba(79,142,247,0.12)', color: 'var(--accent)' },
    amber: { background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' },
    purple:{ background: 'rgba(167,139,250,0.12)', color: 'var(--purple)' },
  }

  return (
    <span style={{
      ...styles[type] || styles.blue,
      fontSize: '11px',
      padding: '3px 8px',
      borderRadius: '20px',
      fontWeight: '500'
    }}>
      {text}
    </span>
  )
}

export default Badge