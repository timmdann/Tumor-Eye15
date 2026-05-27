import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Landing from "@/pages/Landing";
import Register from "@/pages/Register";
import FAQ from "@/pages/FAQ";
import AboutUs from "@/pages/AboutUs";
import StudentAnalysis from "@/pages/StudentAnalysis";
import DoctorAnalysis from "@/pages/DoctorAnalysis";
import DoctorChat from "@/pages/DoctorChat";
import TermsOfService from "@/pages/TermsOfService";
import Login from "@/pages/Login";
import Profile from "./pages/Profile";
import NotFound from "@/pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="page-enter"
      style={{ fontFamily: "Abhaya Libre, serif" }}
    >
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor/upload" element={<DoctorAnalysis />} />
        <Route path="/doctor/result" element={<DoctorAnalysis />} />
        <Route path="/doctor/chat" element={<DoctorChat />} />
        <Route path="/student/upload" element={<StudentAnalysis />} />
        <Route path="/student/result" element={<StudentAnalysis />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
