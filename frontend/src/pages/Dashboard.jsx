// frontend/src/pages/Dashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Job Post State
  const [newJob, setNewJob] = useState({
    title: '', description: '', companyName: '', jobType: 'Full-time', location: 'Remote', minSalary: '', maxSalary: '', skills: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      if (user.role === 'Seeker') {
        const res = await api.get('/applications/my-applications');
        setData(res.data);
      } else if (user.role === 'Recruiter' || user.role === 'Admin') {
        const res = await api.get('/jobs');
        // Simple filter for recruiter's jobs
        const myJobs = res.data.filter(j => j.recruiterId._id === user._id);
        setData(myJobs);
      }
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: newJob.title,
        description: newJob.description,
        company: { name: newJob.companyName, logoUrl: "" },
        salaryRange: { min: Number(newJob.minSalary), max: Number(newJob.maxSalary), currency: 'USD' },
        skillsRequired: newJob.skills.split(',').map(s => s.trim()),
        jobType: newJob.jobType,
        location: newJob.location
      };
      
      await api.post('/jobs', payload);
      setShowModal(false);
      setNewJob({ title: '', description: '', companyName: '', jobType: 'Full-time', location: 'Remote', minSalary: '', maxSalary: '', skills: '' });
      fetchData(); // Refresh list automatically!
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post job');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-500 mt-1">{user.role} Dashboard</p>
        </div>
        {user.role === 'Recruiter' && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
          >
            + Post New Job
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {user.role === 'Seeker' ? 'Your Applications' : 'Your Posted Jobs'}
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            user.role === 'Seeker' ? (
              data.map((app) => (
                <div key={app._id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-1">{app.jobId?.title || 'Unknown Job'}</h3>
                  <p className="text-gray-500 text-sm mb-4">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              data.map((job) => <JobCard key={job._id} job={job} />)
            )
          ) : (
            <div className="col-span-full py-16 text-center bg-white border border-dashed rounded-xl border-gray-300">
              <span className="text-4xl mb-3 block">📊</span>
              <p className="text-gray-500 font-medium">
                {user.role === 'Seeker' 
                  ? "You haven't applied to any jobs yet. Start exploring!" 
                  : "You haven't posted any jobs yet. Click the button above to post one."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handlePostJob} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title</label>
                  <input required type="text" placeholder="e.g. Senior Frontend Engineer" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                  <input required type="text" placeholder="e.g. TechNova" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.companyName} onChange={e => setNewJob({...newJob, companyName: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Salary (₹)</label>
                  <input required type="number" placeholder="500000" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.minSalary} onChange={e => setNewJob({...newJob, minSalary: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Salary (₹)</label>
                  <input required type="number" placeholder="120000" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.maxSalary} onChange={e => setNewJob({...newJob, maxSalary: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Type</label>
                  <select className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.jobType} onChange={e => setNewJob({...newJob, jobType: e.target.value})}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                  <input required type="text" placeholder="e.g. Remote (US)" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills (comma separated)</label>
                <input required type="text" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" placeholder="React, Node.js, Typescript" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea required rows="4" className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter full job description and requirements here..." value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})}></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-gray-600 hover:bg-gray-100 font-medium rounded-xl transition">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition">Post Job Live</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
