import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-400">
            {job.company?.name?.charAt(0) || 'C'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight hover:text-blue-600 transition">
              <Link to={`/jobs/${job._id}`}>{job.title}</Link>
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">{job.company?.name}</p>
          </div>
        </div>
        {job.jobType && (
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
            {job.jobType}
          </span>
        )}
      </div>

      <div className="mb-5">
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {job.skillsRequired?.slice(0, 4).map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-600 text-xs py-1 px-3 rounded-full font-medium">
            {skill}
          </span>
        ))}
        {job.skillsRequired?.length > 4 && (
          <span className="text-xs text-gray-400 font-medium py-1 px-1">
            +{job.skillsRequired.length - 4} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {job.location}
          </span>
          {job.salaryRange?.min && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ₹{job.salaryRange.min.toLocaleString()}
            </span>
          )}
        </div>
        <Link 
          to={`/jobs/${job._id}`} 
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
        >
          Details <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
