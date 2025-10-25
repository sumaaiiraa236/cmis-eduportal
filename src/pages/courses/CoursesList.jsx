import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Users, Clock, Star } from "lucide-react";

export default function CoursesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Sarah Johnson",
      students: 45,
      duration: "14 weeks",
      rating: 4.8,
      category: "Mathematics",
      image: "from-blue-500 to-cyan-500",
      enrolled: true,
    },
    {
      id: 2,
      title: "Quantum Physics",
      code: "PHY401",
      instructor: "Prof. Michael Chen",
      students: 32,
      duration: "16 weeks",
      rating: 4.9,
      category: "Physics",
      image: "from-purple-500 to-pink-500",
      enrolled: true,
    },
    {
      id: 3,
      title: "Organic Chemistry",
      code: "CHEM201",
      instructor: "Dr. Emily Brown",
      students: 38,
      duration: "12 weeks",
      rating: 4.6,
      category: "Chemistry",
      image: "from-green-500 to-emerald-500",
      enrolled: false,
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      code: "CS301",
      instructor: "Dr. James Wilson",
      students: 52,
      duration: "15 weeks",
      rating: 4.9,
      category: "Computer Science",
      image: "from-orange-500 to-red-500",
      enrolled: true,
    },
    {
      id: 5,
      title: "Modern Literature",
      code: "ENG301",
      instructor: "Prof. Amanda Davis",
      students: 28,
      duration: "10 weeks",
      rating: 4.7,
      category: "English",
      image: "from-indigo-500 to-purple-600",
      enrolled: false,
    },
    {
      id: 6,
      title: "Machine Learning",
      code: "CS401",
      instructor: "Dr. Robert Lee",
      students: 41,
      duration: "16 weeks",
      rating: 5.0,
      category: "Computer Science",
      image: "from-pink-500 to-rose-500",
      enrolled: false,
    },
  ];

  const categories = [
    "all",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "English",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            <p className="text-indigo-100">Browse and enroll in available courses</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
            <BookOpen className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div
              className={`bg-gradient-to-br ${course.image} h-48 flex items-center justify-center relative`}
            >
              <BookOpen className="w-20 h-20 text-white/30" />
              {course.enrolled && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  Enrolled
                </span>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{course.code}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-700">
                    {course.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{course.instructor}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No courses found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
