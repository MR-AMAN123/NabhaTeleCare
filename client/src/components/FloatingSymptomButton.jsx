import { Link, useLocation } from "react-router-dom";
import { Cpu } from "lucide-react";

function FloatingSymptomButton() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/register"];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Link
      to="/symptom-checker"
      title="Open AI Symptom Checker"
      aria-label="Open AI Symptom Checker"
      className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#01947a] text-white shadow-[0_25px_50px_-20px_rgba(1,148,122,0.8)] transition hover:bg-teal-700"
    >
      <Cpu className="h-7 w-7" />
    </Link>
  );
}

export default FloatingSymptomButton;
