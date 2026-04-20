import { Spinner } from '@/design-system/atoms';
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { withAuth } from '@/components/withAuth/withAuth'
import { PageLayout } from '@/design-system/layout/PageLayout'


const LoginForm = lazy(() => import('./LoginForm/LoginForm').then(m => ({ default: m.LoginForm })))
const Weather = lazy(() => import('./Weather/Weather').then(m => ({ default: m.Weather })))

const ProtectedWeather = withAuth(Weather)

const Day02 = () => {
  return (
    <PageLayout 
      title="Weather | Authentication | API Integration"
      description="Testing routes, API mocking, and protected paths."
    >
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<LoginForm redirectPath="/day-02/weather" />} />
          <Route path="/login" element={<LoginForm redirectPath="/day-02/weather" />} />
          <Route path="/weather" element={<ProtectedWeather />} />
        </Routes>
      </Suspense>
    </PageLayout>
  )
}

export default Day02
