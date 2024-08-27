'use client';

import PageContainer from '@/components/layout/page-container';
import LeadsComponent from './leads';

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <LeadsComponent />
    </PageContainer>
  );
}
