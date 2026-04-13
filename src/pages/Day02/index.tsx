import { Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'

const Day02 = () => {
  return (
    <div>
      <h1>Day 02 - Auth Integration</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/weather" element={<div>Welcome to the Weather Dashboard!</div>} />
      </Routes>
    </div>
  )
}

export default Day02
