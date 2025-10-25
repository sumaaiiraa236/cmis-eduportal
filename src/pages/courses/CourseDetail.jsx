import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Clock, Star, Award, CheckCircle, 
  PlayCircle, FileText, Calendar, ArrowLeft 
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const course = {
    id: 1,
    title: 'Advanced Mathematics',
    code: 'MATH301',
    instructor: 'Dr. Sarah Johnson',
    students: 45,
    duration: '14 weeks',
    rating: 4.8,
    totalRatings: 127,
    image: 'from-blue-500 to-cyan-500',
    enrolled: true,
    progress: 65,
    description: 'Dive deep into advanced mathematical concepts including calculus, linear algebra, and differential equations. This course is designed for students who want to master complex mathematical theories.',
    prerequisites: ['Basic Calculus', 'Linear Algebra Fundamentals'],
    learningOutcomes: [
      'Master advanced calculus concepts',
      'Solve complex differential equations',
      'Apply linear algebra to real-world problems',
      'Develop critical mathematical thinking'
    ],
    syllabus: [
      { week: 1, title: 'Introduction to Advanced Calculus', completed: true },
      { week: 2, title: 'Multivariable Calculus', completed: true },
      { week: 3, title: 'Vector Calculus', completed: true },
      { week: 4, title: 'Differential Equations I', completed: false },
      { week: 5, title: 'Differential Equations II', completed: false },
      { week: 6, title: 'Linear Algebra Applications', completed: false },
    ],
    assignments: [
      { title: 'Calculus Problem Set 1', dueDate: 'Oct 28, 2025', status: 'submitted' },
      { title: 'Vector Analysis Project', dueDate: 'Nov 5, 2025', status: 'pending' },
      { title: 'Mid-term Exam', dueDate: 'Nov 15, 2025', status: 'upcoming' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Courses</span>
      </button>

      {/* Course Header */}
      <div className={`bg-gradient-to-r ${course.image} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm">
                {course.code}
              </span>
              {course.enrolled && (
                <span className="bg-green-500 px-3 py-1 rounded-lg text-sm font-semibold">
                  Enrolled
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/90 mb-4">Taught by {course.instructor}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-white" />
                <span>{course.rating} ({course.totalRatings} ratings)</span>
              </div>
            </div>
          </div>

          {course.enrolled && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-w-[200px]">
              <p className="text-white/80 text-sm mb-2">Course Progress</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white rounded-full h-3 transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold">{course.progress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['overview', 'syllabus', 'assignments'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Course Description</h3>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Outcomes</h3>
                <ul className="space-y-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <Award className="w-5 h-5 text-indigo-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-3">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                    item.completed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      item.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.completed ? <CheckCircle className="w-6 h-6" /> : item.week}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Week {item.week}</p>
                      <p className="text-gray-600">{item.title}</p>
                    </div>
                  </div>
                  {!item.completed && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                      <PlayCircle className="w-4 h-4" />
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-3">
              {course.assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      assignment.status === 'submitted' ? 'bg-green-100' :
                      assignment.status === 'pending' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        assignment.status === 'submitted' ? 'text-green-600' :
                        assignment.status === 'pending' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{assignment.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold capitalize ${
                    assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                    assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;