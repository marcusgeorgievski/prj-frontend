'use client';
import Link from 'next/link';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { AssessmentModal } from './assessment-modal';
import { AssessmentDropdown } from './assessment-dropdown';

export default function AssessmentCard() {
  return (
    <Link href={'/assessment'}>
      <Card
        className={cn(
          'flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px] relative',
          'w-[300px] h-[100px]'
        )}
      >
        <div
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <AssessmentModal>
            <AssessmentDropdown />
          </AssessmentModal>
        </div>
        <p>Sample</p>
        <p>Card</p>
      </Card>
    </Link>
  );
}
