// src/components/assessments/assessment-template.jsx
"use client";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/page-title";
import { PiListChecksLight } from "react-icons/pi";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssessmentsTable } from "@/components/assessments/assessment-table";
import AssessmentActionButton from "@/components/assessments/assessment-button";

const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

export function AssessmentsTemplate({ assessments, classesList }) {
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState(null);

  const uniqueStatuses = getUniqueValues(assessments, "status");
  const uniqueClasses = classesList.map((classTemp) => classTemp.name);

  const today = new Date();
  const dueSoonDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);

  const filteredAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() !== "completed" &&
      (statusFilter === "" ||
        assessment.status.toLowerCase().includes(statusFilter.toLowerCase())) &&
      (classFilter === "" ||
        assessment.class_name
          .toLowerCase()
          .includes(classFilter.toLowerCase())) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to))
    );
  });

  const dueSoonAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() !== "completed" &&
      (statusFilter === "" ||
        assessment.status.toLowerCase().includes(statusFilter.toLowerCase())) &&
      (classFilter === "" ||
        assessment.class_name
          .toLowerCase()
          .includes(classFilter.toLowerCase())) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to)) &&
      dueDate <= dueSoonDate
    );
  });

  const archiveAssessments = assessments.filter((assessment) => {
    const dueDate = new Date(assessment.due_date);

    return (
      assessment.status.toLowerCase() === "completed" &&
      (statusFilter === "" ||
        assessment.status.toLowerCase().includes(statusFilter.toLowerCase())) &&
      (classFilter === "" ||
        assessment.class_name
          .toLowerCase()
          .includes(classFilter.toLowerCase())) &&
      (!dueDateFilter ||
        (dueDate >= dueDateFilter.from && dueDate <= dueDateFilter.to))
    );
  });

  const resetFilters = () => {
    setStatusFilter("");
    setClassFilter("");
    setDueDateFilter(null);
  };

  console.log("classesList (assessment-template.jsx): ", classesList);

  return (
    <div className="w-full space-y-1">
      <div className="flex space-x-2">
        <PageTitle icon={PiListChecksLight}>Assessments</PageTitle>
        <AssessmentActionButton
          action="create"
          button={true}
          classesList={classesList}
        />
      </div>
      <div className="flex space-x-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="cursor-pointer text-md border border-gray-300 rounded px-2 py-1">
              {statusFilter || "Status"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setStatusFilter("")}>
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
            <div className="cursor-pointer text-md border border-gray-300 rounded px-2 py-1">
              {classFilter || "Classes"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Class</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setClassFilter("")}>
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
          Reset Filters
        </Button>
      </div>

      <AssessmentsTable title="Due Soon" assessments={dueSoonAssessments} />

      <AssessmentsTable
        title="All Assessments"
        assessments={filteredAssessments}
      />

      <AssessmentsTable
        title="Archive Assessment"
        assessments={archiveAssessments}
      />
    </div>
  );
}
