import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/pages/Landing";

const Soon = ({ name }: { name: string }) => (
  <div
    className="min-h-screen flex items-center justify-center text-2xl"
    style={{ color: "var(--c-text)" }}
  >
    {name} - coming soon
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Soon name="Login" />} />
        <Route path="/register" element={<Soon name="Register" />} />
        <Route path="/doctor/upload" element={<Soon name="Doctor Upload" />} />
        <Route path="/doctor/result" element={<Soon name="Doctor Result" />} />
        <Route path="/doctor/chat" element={<Soon name="Doctor Chat" />} />
        <Route
          path="/student/upload"
          element={<Soon name="Student Upload" />}
        />
        <Route
          path="/student/result"
          element={<Soon name="Student Result" />}
        />
        <Route path="/about" element={<Soon name="About Us" />} />
        <Route path="/faq" element={<Soon name="FAQ" />} />
        <Route path="/terms" element={<Soon name="Terms of Service" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
