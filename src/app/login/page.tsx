'use client';

import React, { Suspense } from 'react';
import { LoginForm } from '@/design-system/organisms/LoginForm/LoginForm';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { Spinner } from '@/design-system/atoms';

export default function LoginPage() {
  return (
    <PageLayout 
      title="Login | Medical Science COE"
      description="Enter your credentials to access the Medical Q&A platform."
    >
      <Suspense fallback={<Spinner />}>
        <LoginForm redirectPath="/day-10" />
      </Suspense>
    </PageLayout>
  );
}
