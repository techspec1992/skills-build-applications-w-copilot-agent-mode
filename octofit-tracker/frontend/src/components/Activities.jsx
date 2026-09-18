import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(API_URL)
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="state-message">Loading activities...</p>
  if (status === 'error') return <p className="state-message">Activities are unavailable right now.</p>

  return (
    <section className="content-section">
      <div className="section-heading">
        <div><p className="eyebrow">Movement log</p><h1>Activities</h1></div>
        <span className="result-count">{activities.length} sessions</span>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-row" key={activity._id}>
            <div className="activity-icon">{activity.type?.slice(0, 1).toUpperCase()}</div>
            <div className="activity-main"><strong>{activity.type}</strong><span>{activity.user?.firstName} {activity.user?.lastName} · {activity.team?.name || 'Solo'}</span></div>
            <div className="activity-metric"><strong>{activity.durationMinutes} min</strong><span>{activity.points} points</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
