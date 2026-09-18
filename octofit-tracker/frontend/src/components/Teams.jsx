import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(API_URL).then(setTeams).then(() => setStatus('ready')).catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="state-message">Loading teams...</p>
  if (status === 'error') return <p className="state-message">Teams are unavailable right now.</p>

  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="result-count">{teams.length} teams</span></div><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-swatch" style={{ backgroundColor: team.color }} /><p className="eyebrow">Team</p><h2>{team.name}</h2><p>{team.description}</p><span className="member-count">{team.members?.length || 0} members</span></article>)}</div></section>
}

export default Teams
