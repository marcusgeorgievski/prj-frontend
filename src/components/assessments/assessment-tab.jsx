'use client';
import React, { useEffect, useState } from 'react';
import { getAssessmentsByClassId } from '@/actions/assessments';
import { AssessmentsTable } from '@/components/assessments/assessment-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DatePickerWithRange } from '@/components/ui/date-picker';

const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

export function AssessmentsTab({ classId, classData }) {
  const [assessments, setAssessments] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const assessmentsData = await getAssessmentsByClassId(classId);
        //assessment with class name
        const updatedAssessments = assessmentsData.map((assessment) => ({
          ...assessment,
          class_name: classData.name,
        }));
        setAssessments(updatedAssessments);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [classId]);

  let uniqueStatuses = [];
  let filteredAssessments = [];

  // Filter assessment
  if (assessments) {
    uniqueStatuses = getUniqueValues(assessments, 'status').filter(
      (status) => status.toLowerCase() !== 'completed'
    );

    filteredAssessments = assessments.filter((assessment) => {
      const dueDate = new Date(assessment.due_date);

      return (
        assessment.status.toLowerCase() !== 'completed' &&
        (statusFilter === '' ||
          assessment.status
            .toLowerCase()
            .includes(statusFilter.toLowerCase())) &&
        (!dueDateFilter ||
          (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to))
      );
    });
  }

  // Reset filter
  const resetFilters = () => {
    setStatusFilter('');
    setDueDateFilter(null);
  };

  const handleDeleteAssessment = (assessmentId) => {
    setAssessments((prevAssessments) =>
      prevAssessments.filter((a) => a.assessment_id !== assessmentId)
    );
  };

  if (loading) {
    return <Skeleton />; // Return Skeleton while data is being fetched
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <div className="flex items-center ml-auto space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="px-2 py-1 border border-gray-300 rounded cursor-pointer text-md">
              {statusFilter || 'Status'}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setStatusFilter('')}>
              All Status
            </DropdownMenuItem>
            {uniqueStatuses.map((status, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DatePickerWithRange onSetDueDateFilter={setDueDateFilter} />
        <Button onClick={resetFilters} variant="outline">
          Reset Filters
        </Button>
      </div>

      {filteredAssessments && (
        <div>
          <AssessmentsTable
            assessments={filteredAssessments}
            onDelete={handleDeleteAssessment}
          />
        </div>
      )}
    </div>
  );
}
