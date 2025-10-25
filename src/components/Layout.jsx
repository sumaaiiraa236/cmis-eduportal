import React from "react";
import { LogOut, BookOpen, GraduationCap, Wallet, LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/" },
    { name: "Courses", icon: <BookOpen size={18} />, href: "/courses" },
    { name: "Marks", icon: <GraduationCap size={18} />, href: "/marks" },
    { name: "Fees", icon: <Wallet size={18} />, href: "/fees" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6 text-blue-600">CMIS</h1>
          <nav className="space-y-3">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-50 overflow-y-auto p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Welcome, {user?.name || "User"}</h2>
        </div>
        {children}
      </main>
    </div>
  );
}
