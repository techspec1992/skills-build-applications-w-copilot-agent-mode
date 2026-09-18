import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(API_URL).then(setWorkouts).then(() => setStatus('ready')).catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="state-message">Loading workouts...</p>
  if (status === 'error') return <p className="state-message">Workouts are unavailable right now.</p>

  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div><span className="result-count">{workouts.length} plans</span></div><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="level-tag">{workout.level}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="exercise-list">{workout.exercises?.map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div></section>
}

export default Workouts
