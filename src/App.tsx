import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Day01 from '@/pages/Day01'
import Day02 from '@/pages/Day02'
import '@/App.css'

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem' }}>
        <Link to="/day-01">Day 01</Link>
        <Link to="/day-02">Day 02</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/day-01" replace />} />
          <Route path="/day-01" element={<Day01 />} />
          <Route path="/day-02/*" element={<Day02 />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
