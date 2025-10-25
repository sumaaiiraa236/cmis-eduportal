// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./components/ToastProvider";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import RoleGuard from "./components/guards/RoleGuard";
import MainLayout from "./components/layout/MainLayout";

// ✅ All pages inside src/
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/index"; // or ./Dashboard if your file is named Dashboard.jsx
import StudentMarks from "./pages/students/StudentMarks";
import StudentFees from "./pages/students/StudentFees";
import CoursesList from "./pages/courses/CoursesList";
import CourseDetail from "./pages/courses/CourseDetail";
import FacultyList from "./pages/faculty/FacultyList";
import StudentProgress from "./pages/reports/StudentProgress";
import ProfileSettings from "./pages/settings/ProfileSettings";
import PasswordChange from "./pages/settings/PasswordChange";
import NotFound from "./pages/NotFound";

import { restoreSession } from "./store/slices/authSlice";
import { ROLES } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* ---------- PROTECTED ROUTES ---------- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* Dashboard - Accessible to all authenticated users */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Student Modules */}
              <Route
                path="/students"
                element={
                  <RoleGuard
                    allowedRoles={[
                      ROLES.ADMIN,
                      ROLES.HOD,
                      ROLES.FACULTY,
                      ROLES.STAFF,
                    ]}
                  >
                    <StudentMarks />
                  </RoleGuard>
                }
              />
              <Route
                path="/fees"
                element={
                  <RoleGuard
                    allowedRoles={[
                      ROLES.ADMIN,
                      ROLES.HOD,
                      ROLES.FACULTY,
                      ROLES.STAFF,
                      ROLES.STUDENT,
                    ]}
                  >
                    <StudentFees />
                  </RoleGuard>
                }
              />

              {/* Courses - Accessible to all authenticated users */}
              <Route path="/courses">
                <Route index element={<CoursesList />} />
                <Route path=":id" element={<CourseDetail />} />
              </Route>

              {/* Faculty - Restricted access */}
              <Route
                path="/faculty"
                element={
                  <RoleGuard
                    allowedRoles={[
                      ROLES.ADMIN,
                      ROLES.HOD,
                      ROLES.FACULTY,
                    ]}
                  >
                    <FacultyList />
                  </RoleGuard>
                }
              />

              {/* Reports - Restricted access */}
              <Route
                path="/reports"
                element={
                  <RoleGuard
                    allowedRoles={[
                      ROLES.ADMIN,
                      ROLES.HOD,
                      ROLES.FACULTY,
                    ]}
                  >
                    <StudentProgress />
                  </RoleGuard>
                }
              />

              {/* Settings - Accessible to all authenticated users */}
              <Route path="/settings">
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="password" element={<PasswordChange />} />
              </Route>
            </Route>
          </Route>

          {/* ---------- DEFAULT / FALLBACK ROUTES ---------- */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
