import React, { useState } from "react";
import { Award, TrendingUp, Download } from "lucide-react";

export default function StudentMarks() {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2025");

  const studentMarks = [
    { id: 1, course: "Data Structures & Algorithms", code: "CS201", credits: 4, midterm: 85, assignments: 92, final: 88, total: 88.5, grade: "A" },
    { id: 2, course: "Database Management Systems", code: "CS305", credits: 3, midterm: 90, assignments: 88, final: 92, total: 90.3, grade: "A+" },
    { id: 3, course: "Web Development", code: "CS210", credits: 3, midterm: 92, assignments: 95, final: 94, total: 93.7, grade: "A+" },
    { id: 4, course: "Calculus II", code: "MATH301", credits: 4, midterm: 78, assignments: 82, final: 80, total: 80.0, grade: "B" },
    { id: 5, course: "Software Engineering", code: "CS350", credits: 3, midterm: 86, assignments: 90, final: 87, total: 87.7, grade: "A" },
  ];

  const calculateGPA = () => {
    const gradePoints = { "A+": 4.0, "A": 3.75, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D": 1.0, "F": 0.0 };
    let totalPoints = 0, totalCredits = 0;
    studentMarks.forEach((mark) => {
      totalPoints += gradePoints[mark.grade] * mark.credits;
      totalCredits += mark.credits;
    });
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "bg-green-100 text-green-700";
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-700";
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">My Marks</h1>
          <p className="text-gray-600">View academic performance and grades</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Fall 2025</option>
            <option>Spring 2025</option>
            <option>Fall 2024</option>
            <option>Spring 2024</option>
          </select>

          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Current GPA</p>
            <Award className="text-blue-600 h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{calculateGPA()}</h2>
          <p className="text-green-600 flex items-center gap-1 mt-1 text-sm">
            <TrendingUp className="h-3 w-3" /> Excellent performance
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Credits</p>
            <Award className="text-green-600 h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {studentMarks.reduce((sum, mark) => sum + mark.credits, 0)}
          </h2>
          <p className="text-gray-600 text-sm">This semester</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Average Score</p>
            <Award className="text-purple-600 h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {(studentMarks.reduce((sum, mark) => sum + mark.total, 0) / studentMarks.length).toFixed(1)}%
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Courses</p>
            <Award className="text-orange-600 h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{studentMarks.length}</h2>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Course Code</th>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3 text-center">Credits</th>
              <th className="px-6 py-3 text-center">Midterm</th>
              <th className="px-6 py-3 text-center">Assignments</th>
              <th className="px-6 py-3 text-center">Final</th>
              <th className="px-6 py-3 text-center">Total</th>
              <th className="px-6 py-3 text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentMarks.map((mark) => (
              <tr key={mark.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-3">{mark.code}</td>
                <td className="px-6 py-3">{mark.course}</td>
                <td className="px-6 py-3 text-center">{mark.credits}</td>
                <td className="px-6 py-3 text-center">{mark.midterm}%</td>
                <td className="px-6 py-3 text-center">{mark.assignments}%</td>
                <td className="px-6 py-3 text-center">{mark.final}%</td>
                <td className="px-6 py-3 text-center">{mark.total}%</td>
                <td className="px-6 py-3 text-center">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getGradeColor(mark.grade)}`}>
                    {mark.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
