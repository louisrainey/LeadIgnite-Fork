import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import LeadListClient from '@/components/tables/lead-list-tables/client';
import { leadListData } from '@/constants/dashboard/leadList';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Lead Lists', link: '/dashboard/leadList' }
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <LeadListClient data={[]} />
      </div>
    </PageContainer>
  );
}
