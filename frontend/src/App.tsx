import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Homepage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import LearningCohortPage from './pages/LearningCohorts'
import Login from './pages/Login'
// import Preloader from "./components/Preloader";
import { useEffect } from "react";
import GuruCircleLanding from "./pages/GuruCircleLanding";
import GuruVerification from "./pages/GuruVerification";
import GuruCircleForum from "./pages/GuruCircleForum";
import { useAuth } from './context/AuthContext';

import AdminDashboard from "./pages/AdminDashboard.tsx";

// Instructor Dashboard (New)
import InstructorDashboard from "./pages/InstructorDashboard.tsx";
import InstructorCommunication from "./pages/InstructorCommunication.tsx";
import CourseManagement from "./pages/CourseManagement.tsx";
import RevenueAnalytics from "./pages/RevenueAnalytics.tsx";
import ChapterEditor from "./pages/ChapterEditor.tsx";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  // const [booting, setBooting] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => {}, 1300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning-cohorts" element={<LearningCohortPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/guru-circle" element={<GuruCircleLanding />} />
        <Route path="/guru-circle/verify" element={
          <ProtectedRoute>
            <GuruVerification />
          </ProtectedRoute>
        } />
        <Route path="/guru-circle/forum" element={<GuruCircleForum />} />
        
        {/* Instructor Dashboard */}
        <Route path="/instructor/dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/instructor/communication" element={<ProtectedRoute><InstructorCommunication /></ProtectedRoute>} />
        <Route path="/instructor/courses/:id/management" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
        <Route path="/instructor/revenue" element={<ProtectedRoute><RevenueAnalytics /></ProtectedRoute>} />
        <Route path="/instructor/course-chapters/:id/editor" element={<ProtectedRoute><ChapterEditor /></ProtectedRoute>} />
        
        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        
        {/* Placeholder Routes for missing pages */}
        <Route path="/projects" element={<Home />} />
        <Route path="/volunteer" element={<Home />} />
        <Route path="/testimonials" element={<Home />} />
        <Route path="/exco-team" element={<Home />} />
        <Route path="/research-lab" element={<Home />} />
        <Route path="/news" element={<Home />} />
      </Routes>
    </>
  );
}
