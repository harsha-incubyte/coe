import { Spinner } from '@/design-system/atoms';
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/queryClient'
import { ThemeManager } from '@/design-system/theme/ThemeManager'
import MainLayout from '@/layouts/MainLayout'

import ToastContainer from '@/components/Toast/ToastContainer'

const Day01 = lazy(() => import('@/pages/Day01'))
const Day02 = lazy(() => import('@/pages/Day02'))
const Day03 = lazy(() => import('@/pages/Day03'))
const Day04 = lazy(() => import('@/pages/Day04'))
const Day05 = lazy(() => import('@/pages/Day05'))
const Day06 = lazy(() => import('@/pages/Day06'))
const Day07 = lazy(() => import('@/pages/Day07'))
const Day08 = lazy(() => import('@/pages/Day08'))

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeManager>
        <Router>
          <MainLayout>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Navigate to="/day-01" replace />} />
                <Route path="/day-01" element={<Day01 />} />
                <Route path="/day-02/*" element={<Day02 />} />
                <Route path="/day-03" element={<Day03 />} />
                <Route path="/day-04" element={<Day04 />} />
                <Route path="/day-05" element={<Day05 />} />
                <Route path="/day-06" element={<Day06 />} />
                <Route path="/day-07" element={<Day07 />} />
                <Route path="/day-08" element={<Day08 />} />
              </Routes>
            </Suspense>
          </MainLayout>
          <ToastContainer />
        </Router>
      </ThemeManager>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
