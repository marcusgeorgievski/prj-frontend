"use client"
import Link from "next/link";
import { AssessmentDropdown } from "@/components/assessments/assessment-dropdown";

export function AssessmentsTable({ title, assessments }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      {assessments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-gray-50">
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`inline-block w-3 h-3 mr-2 rounded-full ${getStatusColor(
                      assessment.status
                    )}`}
                  ></span>
                  {assessment.status}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {assessment.class}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/notes/#${assessment.id}`}>
                    {assessment.title}
                  </Link>
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {assessment.description}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {assessment.weight} %
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {assessment.date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  <AssessmentDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No assessments found
        </p>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Completed":
      return "bg-green-500";
    case "not started":
      return "bg-gray-500";
    case "Overdue":
      return "bg-red-500";
    case "Upcoming":
      return "bg-blue-900";
    default:
      return "bg-gray-500";
  }
}
