// src/components/assessments/assessment-template.jsx
'use client';
import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/page-title';
import { PiListChecksLight, PiCaretDown, PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AssessmentsTable } from '@/components/assessments/assessment-table';
import AssessmentActionButton from '@/components/assessments/assessment-button';

const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

export function AssessmentsTemplate({ assessments, classesList }) {
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState(null);

  const uniqueStatuses = getUniqueValues(assessments, 'status');
  const uniqueClasses = classesList.map((classTemp) => classTemp.name);

  const today = new Date();
  const dueSoonDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);

  const filteredAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() !== 'completed' &&
      (statusFilter === '' ||
        assessment.status
          .toLowerCase()
          .includes(statusFilter.toLowerCase())) &&
      (classFilter === '' ||
        assessment.class_name.includes(classFilter)) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to))
    );
  });

  const dueSoonAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() !== 'completed' && assessment.status.toLowerCase() !== 'overdue' &&
      (statusFilter === '' ||
        assessment.status
          .toLowerCase()
          .includes(statusFilter.toLowerCase())) &&
      (classFilter === '' ||
        assessment.class_name.includes(classFilter)) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to)) &&
        dueDate >= today &&
        dueDate <= dueSoonDate
    );
  });

  const archiveAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() === 'completed' &&
      (statusFilter === '' ||
        assessment.status
          .toLowerCase()
          .includes(statusFilter.toLowerCase())) &&
      (classFilter === '' ||
        assessment.class_name.includes(classFilter)) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to))
    );
  });

  const resetFilters = () => {
    setStatusFilter('');
    setClassFilter('');
    setDueDateFilter(null);
  };

  //console.log("classesList (assessment-template.jsx): ", classesList);

  return (
    <div className="w-full space-y-1">
      <PageTitle icon={PiListChecksLight}>Assessments</PageTitle>

      <div>
        <AssessmentActionButton
          action="create"
          button={true}
          classesList={classesList}
        />
      </div>

      <br />

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="px-2 py-1 border border-gray-300 rounded cursor-pointer text-md">
              {statusFilter || 'Status'}
              <PiCaretDown className="ml-1 inline" />
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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="px-2 py-1 border border-gray-300 rounded cursor-pointer text-md">
              {classFilter || 'Classes'}
              <PiCaretDown className="ml-1 inline" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Class</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setClassFilter('')}>
              All Classes
            </DropdownMenuItem>
            {uniqueClasses.map((class_name, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => setClassFilter(class_name)}
              >
                {class_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DatePickerWithRange onSetDueDateFilter={setDueDateFilter} />
        <Button onClick={resetFilters} variant="outline">
          <PiArrowCounterClockwiseBold className="mr-1 inline" />
           Reset Filters
        </Button>
      </div>

      <AssessmentsTable
        title="Due Soon"
        assessments={dueSoonAssessments}
        classesList={classesList}
      />

      <AssessmentsTable
        title="All Assessments"
        assessments={filteredAssessments}
        classesList={classesList}
      />

      <AssessmentsTable
        title="Archive Assessment"
        assessments={archiveAssessments}
        classesList={classesList}
      />
    </div>
  );
}
