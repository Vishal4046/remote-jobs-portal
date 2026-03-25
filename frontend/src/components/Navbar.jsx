import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
          <span>💼</span> RemoteJobs
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
              <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
                <span className="text-sm text-gray-500 font-medium">Hi, {user.name}</span>
                <button 
                  onClick={logout} 
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Log In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition shadow-sm font-medium">
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
