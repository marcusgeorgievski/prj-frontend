'use client';

import { useState,useEffect } from 'react';
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
  const [showClasses, setShowClasses] = useState(true);
  const [showAssessments, setShowAssessments] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    
    setFilteredClasses(
    classes.filter((c) => {
      const nameMatches = c.name && c.name.toLowerCase().includes(query);
      const detailsMatches = c.details && c.details.toLowerCase().includes(query);
      const professorMatches = c.professor && c.professor.toLowerCase().includes(query);

      return nameMatches || detailsMatches || professorMatches;
    })
  );

  setFilteredAssessments(
    assessments.filter((a) => {
      const nameMatches = a.name && a.name.toLowerCase().includes(query);
      const descriptionMatches = a.description && a.description.toLowerCase().includes(query);

      return nameMatches || descriptionMatches;
    })
  );

  setFilteredNotes(
    notes.filter((n) => {
      const nameMatches = n.name && n.name.toLowerCase().includes(query);
      const contentMatches = n.content && n.content.toLowerCase().includes(query);

      return nameMatches || contentMatches;
    })
  );
  }, [searchQuery, classes, assessments, notes]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const classesList = classes.map((classTemp) => {
    return {
      class_id: classTemp.class_id,
      name: classTemp.name,
    };
  });

  return (
    <div className="w-full">
      <PageTitle icon={PiMagnifyingGlassLight}>Search</PageTitle>

      <div className="w-full mt-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full p-2 mb-8 border border-gray-300 rounded"
        />
      </div>

      <div className="w-full flex items-center space-x-4">
        <button
          className="p-2 border border-gray-300 rounded"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Filter Options
        </button>
        {isDropdownOpen && (
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                checked={showClasses}
                onChange={(e) => setShowClasses(e.target.checked)}
              />
              Classes
            </label>
            <label>
              <input
                type="checkbox"
                checked={showAssessments}
                onChange={(e) => setShowAssessments(e.target.checked)}
              />
              Assessments
            </label>
            <label>
              <input
                type="checkbox"
                checked={showNotes}
                onChange={(e) => setShowNotes(e.target.checked)}
              />
              Notes
            </label>
          </div>
        )}
      </div>

      {!searchQuery ? (
        <div className="text-center mt-8">
          <p>Enter a query to search your classes, assessments and notes</p>
        </div>
      ) : (
        <>
          {/* Filtered Classes */}
          {showClasses && (
          <div className={`w-full mt-8 ${!showAssessments ? 'mb-8' : ''}`}>
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
                        classData={c}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}

          
          {/* Filtered Assessments */}
          {showAssessments && (
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
                    assessments={filteredAssessments}
                    classesList={classesList}
                  />
                </div>
              </div>
            )}
          </div>
          )}


          {/* Filtered Notes */}
          {showNotes && (
          <div className={`w-full mb-8 ${!showAssessments ? 'mt-8' : ''}`}>
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
                        noteData={n}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}
        </>
      )}
    </div>
  );
}
