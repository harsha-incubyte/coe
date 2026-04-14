import { Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import Weather from './Weather'

const Day02 = () => {
  return (
    <div>
      <h1>Weather | Authentication | API Integration</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  )
}

export default Day02
