import React, { Suspense } from 'react';
import { LoginForm } from '@/design-system/organisms/LoginForm/LoginForm';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { Spinner } from '@/design-system/atoms';
import { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Login | Medical Science COE',
  description: 'Enter your credentials to access the Medical Q&A platform.',
};

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
