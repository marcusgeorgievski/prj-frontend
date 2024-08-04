'use client';

import { useState } from 'react';
import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  PiChalkboardTeacherLight,
  PiMagnifyingGlassLight,
  PiNotePencilLight,
  PiListChecksLight,
} from 'react-icons/pi';

import { AssessmentsTable } from '@/components/assessments/assessment-table';
import ClassActionButton from '@/components/classes/class-button';
import ClassCard from '@/components/classes/class-card';
import NoteCard from '../notes/note-card';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function highlightText(text, query) {
  const escapedQuery = escapeRegExp(query);
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <span style={{"background-color":"yellow"}}><strong key={index}>{part}</strong></span> : part
  );
}

export function SearchTemplate({ classes, notes, assessments }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredClasses(
      classes.filter((c) =>
        c.name.toLowerCase().includes(query) || c.details.toLowerCase().includes(query) || c.professor.toLowerCase().includes(query)
      )
    );

    setFilteredAssessments(
      assessments.filter((a) =>
        a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)
      )
    );

    setFilteredNotes(
      notes.filter((n) =>
        n.name.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="w-full">
      <PageTitle icon={PiMagnifyingGlassLight}>Search</PageTitle>

      <div className="w-full mt-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>

      {!searchQuery ? (
        <div className="text-center mt-8">
          <p>Enter a query to search your classes, assessments and notes</p>
        </div>
      ) : (
        <>
          {/* Filtered Classes */}
          <div className="w-full mt-8">
            <PageTitle icon={PiChalkboardTeacherLight} sub>
              Classes
            </PageTitle>
            {filteredClasses.length === 0 ? (
              <div className="text-center">
                <p className="pt-[2vh]">No matching classes found.</p>
                <Link href="/classes" className="text-lg">
                  <Button className="mt-4">Go to Classes</Button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredClasses.map((c) => (
                    <div key={c.id}>
                      <ClassCard
                        key={c.id}
                        classData={{
                          ...c,
                          name: <span>{highlightText(c.name, searchQuery)}</span>,
                          details: <span>{highlightText(c.details, searchQuery)}</span>,
                          professor: <span>{highlightText(c.professor, searchQuery)}</span>,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filtered Assessments */}
          <div className="w-full mb-8 mt-8">
            <PageTitle icon={PiListChecksLight} sub>
              Assessments
            </PageTitle>
            {filteredAssessments.length === 0 ? (
              <div className="text-center">
                <p className="pt-[2vh]">No matching assessments found.</p>
                <Link href="/assessments" className="text-lg">
                  <Button className="mt-4">Go to Assessments</Button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="grid items-center">
                  <AssessmentsTable
                    assessments={filteredAssessments.map(a => ({
                      ...a,
                      name: <span>{highlightText(a.name, searchQuery)}</span>,
                      description: <span>{highlightText(a.description, searchQuery)}</span>,
                    }))}
                    isDashboard={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filtered Notes */}
          <div className="w-full mb-8">
            <PageTitle icon={PiNotePencilLight} sub>
              Notes
            </PageTitle>

            {filteredNotes.length === 0 ? (
              <div className="text-center">
                <p className="pt-[2vh]">No matching notes found.</p>
                <Link href="/notes/" className="text-lg">
                  <Button className="mt-4">Go to Notes</Button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredNotes.map((n) => (
                    <div key={n.id}>
                      <NoteCard
                        key={n.id}
                        noteData={{
                          ...n,
                          name: <span>{highlightText(n.name, searchQuery)}</span>,
                          content: <span>{highlightText(n.content, searchQuery)}</span>,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
