'use client';
import React, { useEffect, useState } from 'react';
import { getAssessmentsByClassId } from '@/actions/assessments';
import { getClasses } from "@/actions/classes"
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
import { useAuth } from "@clerk/nextjs"
import AssessmentActionButton from '@/components/assessments/assessment-button';
import { useRouter } from 'next/navigation';

const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

export function AssessmentsTab({ classId }) {
  const [classData, setClassData] = useState(null);
  const [assessments, setAssessments] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState(null);

  const { userId } = useAuth()
  const router = useRouter();
  
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classes = await getClasses(userId);
        const c = classes.find((c) => c.class_id === classId);
        setClassData(c);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClassData();
  }, [classId, userId]);

  const fetchAssessments = async () => {
    setLoading(true)
    try {
      const assessmentsData = await getAssessmentsByClassId(classId);
      const updatedAssessments = assessmentsData.map((assessment) => ({
        ...assessment,
        class_name: classData?.name,
      }));
      setAssessments(updatedAssessments);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classData) {
      fetchAssessments();
    }
  }, [classData]);

   //get class list for create assessment
   const classesList = classData ? [{
    class_id: classData.class_id,
    name: classData.name,
  }] : [];

  let uniqueStatuses = [];
  let filteredAssessments = [];

  //console.log(uniqueStatuses);

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

  const onCreate = async (newAssessment) => {
    try {
      const classes = await getClasses(userId);
      const selectedClass = classes.find((c) => c.class_id === newAssessment.class_id);
  
      if (selectedClass) {
        newAssessment.class_name = selectedClass.name;
      }
      setAssessments((prevAssessments) => [...prevAssessments, newAssessment]);
    } catch (error) {
      console.error('Error fetching class data or updating assessments:', error);
    }
  };

  if (loading) {
    return <Skeleton />; // Return Skeleton while data is being fetched
  }

  return (
    <div className="mt-6">
       <div>
        <AssessmentActionButton
          action="create"
          button={true}
          classesList={classesList}
          onCreate={onCreate}
        />
      </div>
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
