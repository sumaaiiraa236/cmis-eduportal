import { useState } from "react";
import { useSelector } from "react-redux";
import { TrendingUp, Award, Download, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ROLES } from "../../utils/constants";

function StudentProgress() {
  const { user } = useSelector((state) => state.auth);
  const [selectedSemester, setSelectedSemester] = useState("all");

  // Mock data
  const semesterProgress = [
    { semester: "Fall 2023", gpa: 3.2, credits: 15 },
    { semester: "Spring 2024", gpa: 3.5, credits: 16 },
    { semester: "Fall 2024", gpa: 3.6, credits: 17 },
    { semester: "Spring 2025", gpa: 3.7, credits: 15 },
    { semester: "Fall 2025", gpa: 3.75, credits: 17 },
  ];

  const coursePerformance = [
    { course: "CS201", midterm: 85, final: 88, total: 87 },
    { course: "CS305", midterm: 90, final: 92, total: 91 },
    { course: "CS210", midterm: 92, final: 94, total: 93 },
    { course: "MATH301", midterm: 78, final: 80, total: 79 },
    { course: "CS350", midterm: 86, final: 87, total: 86 },
  ];

  const attendanceData = [
    { month: "Sep", attendance: 95 },
    { month: "Oct", attendance: 92 },
    { month: "Nov", attendance: 90 },
    { month: "Dec", attendance: 88 },
  ];

  const skillProgress = [
    { skill: "Programming", level: 85, trend: "up" },
    { skill: "Problem Solving", level: 78, trend: "up" },
    { skill: "Database Design", level: 82, trend: "up" },
    { skill: "Web Development", level: 90, trend: "up" },
    { skill: "Mathematics", level: 75, trend: "stable" },
  ];

  const achievements = [
    { title: "Dean's List", semester: "Spring 2025", date: "2025-06-15" },
    { title: "Best Project Award", semester: "Fall 2024", date: "2024-12-10" },
    { title: "Perfect Attendance", semester: "Spring 2024", date: "2024-06-01" },
  ];

  const currentGPA = semesterProgress[semesterProgress.length - 1].gpa;
  const totalCredits = semesterProgress.reduce((sum, s) => sum + s.credits, 0);
  const averageAttendance = Math.round(
    attendanceData.reduce((sum, a) => sum + a.attendance, 0) / attendanceData.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">
            {user?.role === ROLES.STUDENT ? "My Progress" : "Student Progress"}
          </h1>
          <p className="text-gray-600">Track academic performance and growth</p>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Time</option>
            <option value="current">Current Semester</option>
            <option value="year">This Year</option>
          </select>

          <button className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* GPA */}
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Current GPA</p>
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{currentGPA}</div>
          <p className="text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            +0.15 this semester
          </p>
        </div>

        {/* Credits */}
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Credits</p>
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{totalCredits}</div>
          <p className="text-gray-600 mt-1">Completed credits</p>
        </div>

        {/* Attendance */}
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Attendance</p>
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">{averageAttendance}%</div>
          <div className="h-2 bg-gray-200 rounded mt-2">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${averageAttendance}%` }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Achievements</p>
            <Award className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {achievements.length}
          </div>
          <p className="text-gray-600 mt-1">Awards earned</p>
        </div>
      </div>

      {/* GPA Trend */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">GPA Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={semesterProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="gpa"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb", r: 5 }}
              name="GPA"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Course Performance */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Current Semester Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={coursePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="midterm" fill="#3b82f6" name="Midterm" />
            <Bar dataKey="final" fill="#10b981" name="Final" />
            <Bar dataKey="total" fill="#8b5cf6" name="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Attendance Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 5 }}
                name="Attendance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Progress */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Skills Assessment
          </h2>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{skill.level}%</span>
                    {skill.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Achievements
        </h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-900">{achievement.title}</p>
                  <p className="text-gray-500 text-sm">
                    {achievement.semester}
                  </p>
                </div>
              </div>
              <span className="text-sm border rounded px-3 py-1 text-gray-700">
                {achievement.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentProgress;
