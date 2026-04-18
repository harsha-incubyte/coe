import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './LoginForm/LoginForm'
import { Weather } from './Weather/Weather'
import { withAuth } from '@/components/withAuth/withAuth'
import { PageLayout } from '@/design-system/layout/PageLayout'

const ProtectedWeather = withAuth(Weather)

const Day02 = () => {
  return (
    <PageLayout 
      title="Weather | Authentication | API Integration"
      description="Testing routes, API mocking, and protected paths."
    >
      <Routes>
        <Route path="/" element={<LoginForm redirectPath="/day-02/weather" />} />
        <Route path="/login" element={<LoginForm redirectPath="/day-02/weather" />} />
        <Route path="/weather" element={<ProtectedWeather />} />
      </Routes>
    </PageLayout>
  )
}

export default Day02
