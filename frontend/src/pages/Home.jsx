import { useState, useEffect } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter(job => 
      job.title?.toLowerCase().includes(lowercasedTerm) ||
      job.company?.name?.toLowerCase().includes(lowercasedTerm) ||
      job.location?.toLowerCase().includes(lowercasedTerm) ||
      job.skillsRequired?.some(skill => skill.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredJobs(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center shadow-xl">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">Find Your Dream Remote Job</h1>
        <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Explore thousands of remote opportunities from top tech companies world-wide. Work from anywhere.</p>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by job title, skills, or company..." 
              className="w-full pl-11 pr-5 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm leading-tight border-0"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition duration-300 shadow-sm whitespace-nowrap"
          >
            Search Jobs
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{searchTerm ? 'Search Results' : 'Featured Opportunities'}</h2>
        <span className="text-gray-500 font-medium bg-gray-100 py-1 px-3 rounded-full text-sm">{filteredJobs.length} jobs available</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <span className="text-4xl mb-4 block">🏝️</span>
              <h3 className="text-lg font-semibold text-gray-800">No jobs found matching "{searchTerm}"</h3>
              <p className="text-gray-500 mt-1">Try searching for different keywords or clear your search.</p>
              <button onClick={() => {setSearchTerm(''); setFilteredJobs(jobs);}} className="mt-4 text-blue-600 font-medium hover:underline">Clear Search</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
