import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Day01 from '@/pages/Day01'
import Day02 from '@/pages/Day02'
import '@/App.css'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/day-01" replace />} />
          <Route path="/day-01" element={<Day01 />} />
          <Route path="/day-02/*" element={<Day02 />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
