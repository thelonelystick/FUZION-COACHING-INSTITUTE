import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import ParentLayout from "../layouts/ParentLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import CoursesPage from "../pages/public/CoursesPage";
import FacultyPage from "../pages/public/FacultyPage";
import AchievementsPage from "../pages/public/AchievementsPage";
import DemoPage from "../pages/public/DemoPage";
import ContactPage from "../pages/public/ContactPage";
import StudentDashboard from "../pages/student/StudentDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import ParentDashboard from "../pages/parent/ParentDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
        </Route>

        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
