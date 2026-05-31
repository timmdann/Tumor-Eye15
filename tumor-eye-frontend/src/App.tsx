import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/lib/hooks";
import { setUser, clearUser } from "@/store/slices/authSlice";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/types/api";

import AnalyticsListener from "@/components/AnalyticsListener";
import PrivateRoute from "@/components/PrivateRoute";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import DoctorAnalysis from "@/pages/DoctorAnalysis";
import DoctorChat from "@/pages/DoctorChat";
import StudentAnalysis from "@/pages/StudentAnalysis";
import AboutUs from "@/pages/AboutUs";
import FAQ from "@/pages/FAQ";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/NotFound";

function getAnimationKey(pathname: string) {
  const segment = pathname.split("/")[1];
  if (segment === "doctor" || segment === "student") return segment;
  return pathname;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={getAnimationKey(location.pathname)} className="page-enter" style={{ fontFamily: "Abhaya Libre, serif" }}>
      <Routes location={location}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Auth required */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Doctor only */}
        <Route element={<PrivateRoute role="doctor" />}>
          <Route path="/doctor/upload" element={<DoctorAnalysis />} />
          <Route path="/doctor/result" element={<DoctorAnalysis />} />
          <Route path="/doctor/chat" element={<DoctorChat />} />
        </Route>

        {/* Student only */}
        <Route element={<PrivateRoute role="student" />}>
          <Route path="/student/upload" element={<StudentAnalysis />} />
          <Route path="/student/result" element={<StudentAnalysis />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const dispatch = useAppDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        dispatch(setUser({
          role: meta.role as UserRole,
          username: meta.username as string,
          email: session.user.email ?? "",
        }));
      } else {
        dispatch(clearUser());
      }
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  if (!authReady) return null;

  return (
    <BrowserRouter>
      <AnalyticsListener />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
