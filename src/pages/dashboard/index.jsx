import React from 'react';
import { useSelector } from 'react-redux';
import { ROLES } from '../../utils/constants';
import { Award, BookOpen, Calendar, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  // Mock data (replace with API later)
  const studentData = {
    cgpa: 3.75,
    attendance: 92,
    pendingFees: 5000,
    courses: 6,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        Welcome {user?.name || 'Student'}!
      </h1>
      <p className="text-gray-600 mb-6">Here’s your quick academic overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 border">
          <div className="flex justify-between">
            <p className="text-gray-600">CGPA</p>
            <Award className="text-blue-600 h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">{studentData.cgpa}</h2>
          <p className="text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" /> +0.15 from last semester
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <div className="flex justify-between">
            <p className="text-gray-600">Attendance</p>
            <CheckCircle className="text-green-600 h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">{studentData.attendance}%</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <div className="flex justify-between">
            <p className="text-gray-600">Courses</p>
            <BookOpen className="text-purple-600 h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">{studentData.courses}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <div className="flex justify-between">
            <p className="text-gray-600">Pending Fees</p>
            <DollarSign className="text-orange-600 h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">${studentData.pendingFees}</h2>
          <Link to="/students/fees" className="text-blue-600 hover:underline">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
