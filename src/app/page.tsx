"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import MatchScore from '../components/MatchScore';
import { Job } from '../types/job';

// Define context type
interface JobContextType {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
}

// Create context
const JobContext = createContext<JobContextType | undefined>(undefined);

// Context provider component
function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch('/jobs.json')
      .then((response) => response.json())
      .then((data) => setJobs(data as Job[]))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <JobContext.Provider value={{ jobs, selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
}

// Custom hook to use context
function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}

// Main component
export default function Home() {
  return (
    <JobProvider>
      <JobDashboard />
    </JobProvider>
  );
}

// Dashboard component using context
function JobDashboard() {
  const { jobs, selectedJob, setSelectedJob } = useJobs();
  const userSkills: string[] = ['React', 'JavaScript', 'CSS'];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Job Match Dashboard</h1>
      <div className="mt-4 space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col"
            >
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <p className="text-gray-600">{job.salary}</p>
              <div className="mt-2">
                <MatchScore score={job.matchScore} />
              </div>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors self-start"
                onClick={() => setSelectedJob(job)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>Loading jobs...</p>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
            <p className="text-gray-600 mb-1">{selectedJob.company} - {selectedJob.location}</p>
            <p className="text-gray-600 mb-3">{selectedJob.salary}</p>
            <p className="text-gray-700">
              <strong>Required Skills:</strong> {selectedJob.requiredSkills.join(', ')}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex-1"
                onClick={() => {
                  const missingSkills = selectedJob.requiredSkills.filter(
                    (skill) => !userSkills.includes(skill)
                  );
                  if (missingSkills.length > 0) {
                    alert(`Upskill in: ${missingSkills.join(', ')}`);
                  } else {
                    alert('Applied successfully!');
                  }
                }}
              >
                Apply Now
              </button>
              <button
                className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex-1"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}