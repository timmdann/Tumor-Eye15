import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text)" }}
    >
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1
          className="font-bold leading-none mb-4"
          style={{
            fontSize: "clamp(72px, 12vw, 150px)",
            fontFamily: "Abhaya Libre, serif",
            color: "var(--c-accent)",
          }}
        >
          404
        </h1>

        <h2 className="text-3xl font-extrabold mb-4">
          Page not found
        </h2>

        <p
          className="mb-10 max-w-md text-lg font-bold"
          style={{ color: "var(--c-muted)" }}
        >
          The page you are looking for does not exist or has been moved.
        </p>

        <Button onClick={() => navigate("/")}>
          Back to home
        </Button>
      </main>
    </div>
  );
}