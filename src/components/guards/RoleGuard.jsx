import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

/**
 * Role-based route guard.
 * Example usage:
 * <RoleGuard allowedRoles={['admin']}><AdminPage /></RoleGuard>
 */
export default function RoleGuard({ allowedRoles, children }) {
  const { user } = useSelector((state) => state.auth);

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists but doesn't have permission
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-gray-900 text-2xl font-semibold mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don’t have permission to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/unauthorized")}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Go to Unauthorized Page
          </button>
        </div>
      </div>
    );
  }

  // If user is authorized, render the protected content
  return children;
}
