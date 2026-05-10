import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from "@/pages/Landing";
import Register from "@/pages/Register";
import FAQ from "@/pages/FAQ";
import AboutUs from "@/pages/AboutUs";
import Soon from "@/components/Soon";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Soon name="Login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/upload" element={<Soon name="Doctor Upload" />} />
        <Route path="/doctor/result" element={<Soon name="Doctor Result" />} />
        <Route path="/doctor/chat" element={<Soon name="Doctor Chat" />} />
        <Route path="/student/upload" element={<Soon name="Student Upload" />} />
        <Route path="/student/result" element={<Soon name="Student Result" />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Soon name="Terms of Service" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
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