import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

const API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(API_URL).then(setUsers).then(() => setStatus('ready')).catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="state-message">Loading users...</p>
  if (status === 'error') return <p className="state-message">Users are unavailable right now.</p>

  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Your crew</p><h1>Members</h1></div><span className="result-count">{users.length} athletes</span></div><div className="user-grid">{users.map((user) => <article className="user-card" key={user._id}><div className="avatar avatar-large">{user.avatar || `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}</div><h2>{user.firstName} {user.lastName}</h2><p>@{user.username}</p><span>{user.email}</span></article>)}</div></section>
}

export default Users
