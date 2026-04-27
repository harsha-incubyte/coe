'use client';

import React from 'react';
import { PageLayout } from '@/design-system/layout/PageLayout'


import { Weather } from './Weather/Weather';

const Day02 = () => {
  return (
    <PageLayout 
      title="Weather | Authentication | API Integration"
      description="Testing routes, API mocking, and protected paths."
    >
      <Weather />
    </PageLayout>
  )
}

export default Day02
