import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Wallet, GraduationCap } from "lucide-react";

const cards = [
  { name: "Students", count: 320, icon: <Users className="text-blue-600" /> },
  { name: "Courses", count: 24, icon: <BookOpen className="text-green-600" /> },
  { name: "Fees Collected", count: "₹4.5L", icon: <Wallet className="text-orange-600" /> },
  { name: "Exam Records", count: 1120, icon: <GraduationCap className="text-purple-600" /> },
];

export default function Dashboard() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {cards.map((c, i) => (
        <motion.div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition"
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h3 className="text-sm font-medium text-gray-500">{c.name}</h3>
            <p className="text-2xl font-semibold text-gray-800">{c.count}</p>
          </div>
          <div className="text-3xl">{c.icon}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
