import React, { useState } from "react";
import { Search, Mail, Phone, Plus } from "lucide-react";

export default function FacultyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const faculty = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Mathematics",
      email: "sarah.j@edu.com",
      phone: "+1 234-567-8901",
      courses: 4,
      students: 156,
      rating: 4.8,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      department: "Physics",
      email: "michael.c@edu.com",
      phone: "+1 234-567-8902",
      courses: 3,
      students: 98,
      rating: 4.9,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Dr. Emily Brown",
      department: "Chemistry",
      email: "emily.b@edu.com",
      phone: "+1 234-567-8903",
      courses: 5,
      students: 178,
      rating: 4.7,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      department: "Computer Science",
      email: "james.w@edu.com",
      phone: "+1 234-567-8904",
      courses: 6,
      students: 205,
      rating: 4.9,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "Prof. Amanda Davis",
      department: "English",
      email: "amanda.d@edu.com",
      phone: "+1 234-567-8905",
      courses: 3,
      students: 87,
      rating: 4.6,
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  const departments = ["all", "Mathematics", "Physics", "Chemistry", "Computer Science", "English"];

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "all" || f.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalStudents = faculty.reduce((sum, f) => sum + f.students, 0);
  const avgRating = (faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length).toFixed(1);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
            <p className="text-indigo-100">Meet our esteemed professors and lecturers</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
            <Plus className="w-5 h-5" />
            Add Faculty
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-600 mb-1">Total Faculty</p>
          <p className="text-3xl font-bold text-gray-900">{faculty.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-600 mb-1">Departments</p>
          <p className="text-3xl font-bold text-gray-900">{departments.length - 1}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-600 mb-1">Avg Rating</p>
          <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedDept === dept
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${member.gradient} h-32 relative`}>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700 shadow-xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>

            <div className="pt-16 p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-indigo-600 font-medium mb-4">{member.department}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${member.email}`} className="hover:underline">
                    {member.email}
                  </a>
                </div>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.courses}</p>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.students}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center text-gray-500 py-12">No faculty found.</div>
      )}
    </div>
  );
}
