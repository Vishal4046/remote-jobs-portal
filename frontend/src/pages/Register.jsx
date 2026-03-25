import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Seeker' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
        <p className="text-gray-500 mt-2">Join to find or post remote jobs today.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
          <input 
            type="text" required 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input 
            type="email" required 
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input 
            type="password" required minLength="6"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition"
            placeholder="Min 6 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">I am a...</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`cursor-pointer border rounded-xl p-3 text-center transition ${formData.role === 'Seeker' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
              <input 
                type="radio" name="role" value="Seeker" className="hidden"
                checked={formData.role === 'Seeker'} onChange={(e) => setFormData({...formData, role: e.target.value})} 
              />
              <span className="font-medium text-sm block">Job Seeker</span>
            </label>
            <label className={`cursor-pointer border rounded-xl p-3 text-center transition ${formData.role === 'Recruiter' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
              <input 
                type="radio" name="role" value="Recruiter" className="hidden"
                checked={formData.role === 'Recruiter'} onChange={(e) => setFormData({...formData, role: e.target.value})} 
              />
              <span className="font-medium text-sm block">Employer</span>
            </label>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-blue-600/20 mt-4 flex justify-center items-center"
        >
          {loading ? (
             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
             </svg>
          ) : "Create Account"}
        </button>
      </form>
      
      <p className="mt-8 text-center text-gray-600 text-sm font-medium">
        Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">Log in here</Link>
      </p>
    </div>
  );
};

export default Register;
