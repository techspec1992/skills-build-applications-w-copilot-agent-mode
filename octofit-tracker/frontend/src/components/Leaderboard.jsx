import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(API_URL).then(setEntries).then(() => setStatus('ready')).catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="state-message">Loading leaderboard...</p>
  if (status === 'error') return <p className="state-message">Leaderboard is unavailable right now.</p>

  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Keep climbing</p><h1>Leaderboard</h1></div><span className="result-count">All time</span></div><div className="leaderboard-list">{entries.map((entry) => <article className="leaderboard-row" key={entry._id}><span className={`rank rank-${entry.rank}`}>{String(entry.rank).padStart(2, '0')}</span><div className="avatar">{entry.user?.avatar || '?'}</div><div className="leader-main"><strong>{entry.user?.firstName} {entry.user?.lastName}</strong><span>{entry.team?.name || 'Independent'}</span></div><strong className="points">{entry.points}<small> pts</small></strong></article>)}</div></section>
}

export default Leaderboard
