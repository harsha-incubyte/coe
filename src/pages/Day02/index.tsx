import { Spinner } from '@/design-system/atoms';
import { lazy, Suspense } from 'react'
import { PageLayout } from '@/design-system/layout/PageLayout'


const LoginForm = lazy(() => import('@/design-system/organisms').then(m => ({ default: m.LoginForm })))
const Weather = lazy(() => import('./Weather/Weather').then(m => ({ default: m.Weather })))

const Day02 = () => {
  return (
    <PageLayout 
      title="Weather | Authentication | API Integration"
      description="Testing routes, API mocking, and protected paths."
    >
      <Suspense fallback={<Spinner />}>
        <Weather />
      </Suspense>
    </PageLayout>
  )
}

export default Day02
