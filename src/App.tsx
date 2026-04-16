import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Day01 from '@/pages/Day01'
import Day02 from '@/pages/Day02'
import Day03 from '@/pages/Day03'
import Day04 from '@/pages/Day04'
import Day05 from '@/pages/Day05'
import Day06 from '@/pages/Day06'
import ToastContainer from '@/components/Toast/ToastContainer'
import '@/App.css'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/day-01" replace />} />
          <Route path="/day-01" element={<Day01 />} />
          <Route path="/day-02/*" element={<Day02 />} />
          <Route path="/day-03" element={<Day03 />} />
          <Route path="/day-04" element={<Day04 />} />
          <Route path="/day-05" element={<Day05 />} />
          <Route path="/day-06" element={<Day06 />} />
        </Routes>
      </MainLayout>
      <ToastContainer />
    </Router>
  )
}

export default App
