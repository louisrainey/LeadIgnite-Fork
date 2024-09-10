'use client';
import { Button } from '@/components/ui/button';
import { LeadDataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface ProductsClientProps {
  data: Lead[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Lead Manager (${data.length})`}
          description="See a list of existing leads and follow ups, or create new leads."
        />
      </div>
      <Separator />
      <LeadDataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
