import { AssessmentDropdown } from '@/components/assessments/assessment-dropdown';
import { useState, useEffect } from 'react';

export function AssessmentsTable({
  title,
  assessments,
  onDelete,
  classesList,
  onEdit,
}) {
  const [sortedAssessments, setSortedAssessments] = useState([
    ...assessments,
  ]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...assessments];

    if (sortConfig.key) {
      sortedData = sortedData.sort((a, b) => {
        const { key, direction } = sortConfig;
        if (key === 'due_date') {
          return direction === 'ascending'
            ? new Date(a[key]) - new Date(b[key])
            : new Date(b[key]) - new Date(a[key]);
        } else if (typeof a[key] === 'string') {
          return direction === 'ascending'
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        } else {
          return direction === 'ascending'
            ? a[key] - b[key]
            : b[key] - a[key];
        }
      });
    }

    setSortedAssessments(sortedData);
  }, [assessments, sortConfig]);

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return '↑↓';
  };

  const handleRowClick = (assessmentId) => {
    // window.location.href = `/notes/#${assessmentId}`;
  };

  const truncateText = (text, maxLength = 15) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      {sortedAssessments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'status', label: 'Status', width: 'w-1/6' },
                { key: 'class_name', label: 'Class Name', width: 'w-1/6' },
                { key: 'name', label: 'Name', width: 'w-1/6' },
                {
                  key: 'description',
                  label: 'Description',
                  width: 'w-1/6',
                },
                { key: 'weight', label: 'Weight', width: 'w-1/6' },
                { key: 'due_date', label: 'Due Date', width: 'w-1/6' },
              ].map(({ key, label, width }) => (
                <th
                  key={key}
                  className={`px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer ${width}`}
                  onClick={() => onSort(key)}
                >
                  {label}
                  {getSortArrow(key)}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAssessments.map((assessment) => (
              <tr
                key={assessment.assessment_id}
                className="hover:bg-gray-50"
                onClick={() => handleRowClick(assessment.id)}
              >
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  <span
                    className={`inline-block w-3 h-3 mr-2 rounded-full ${getStatusColor(
                      assessment.status
                    )}`}
                  ></span>
                  {truncateText(assessment.status)}
                </td>
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  {truncateText(assessment.class_name)}
                </td>
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  {truncateText(assessment.name)}
                </td>
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  {truncateText(assessment.description)}
                </td>
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  {truncateText(`${assessment.weight} %`)}
                </td>
                <td className="px-6 py-1 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(assessment.due_date).toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }
                  )}
                </td>
                <td className="px-4 py-1 text-sm text-gray-500 whitespace-nowrap">
                  <AssessmentDropdown
                    assessmentData={assessment}
                    onDelete={onDelete}
                    classesList={classesList}
                    onEdit={onEdit}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No assessments found
        </p>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'not started':
      return 'bg-gray-500';
    case 'overdue':
      return 'bg-red-500';
    case 'upcoming':
      return 'bg-blue-900';
    default:
      return 'bg-gray-500';
  }
}
