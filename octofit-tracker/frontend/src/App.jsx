import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/activities', icon: '01' },
  { label: 'Leaderboard', path: '/leaderboard', icon: '02' },
  { label: 'Teams', path: '/teams', icon: '03' },
  { label: 'Members', path: '/users', icon: '04' },
  { label: 'Workouts', path: '/workouts', icon: '05' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand"><img src={logo} alt="OctoFit Tracker" /><span>OCTOFIT<br /><b>TRACKER</b></span></div>
          <p className="sidebar-label">Your fitness fieldbook</p>
          <nav aria-label="Primary navigation">
            {navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} key={item.path} to={item.path}><span className="nav-number">{item.icon}</span>{item.label}</NavLink>)}
          </nav>
          <div className="sidebar-footer"><span className="pulse" />API connected<br /><small>Ready for your next session</small></div>
        </aside>
        <main className="main-content">
          <header className="topbar"><span className="mobile-brand">OCTOFIT <b>TRACKER</b></span><span className="date-stamp">MERGINGTON HIGH / 2026</span><span className="status-dot">LIVE</span></header>
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
