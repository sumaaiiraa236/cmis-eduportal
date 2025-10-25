
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted, 
            or you may have mistyped the URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {['Dashboard', 'Courses', 'Profile'].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                <p className="text-sm font-medium text-indigo-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-gray-500 text-sm">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default NotFound;