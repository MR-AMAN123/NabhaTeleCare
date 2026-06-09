import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { ArrowRight, HeartPulse, Search, ShieldCheck } from "lucide-react";

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCheck = async () => {
    if (!symptoms.trim()) {
      alert("Please describe your symptoms before checking.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/symptoms", { symptoms });
      setResult(data.result || "No recommendation available.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fcf9] text-slate-900 font-sans">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#01947a] p-2 rounded-xl text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">AI Symptom Checker</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/patient" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
              Back to dashboard
            </Link>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Patient"}</span>
            <button onClick={handleLogout} className="rounded-full bg-[#01947a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
              <Search className="h-4 w-4" />
              Smart symptom check
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Describe how you feel</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Enter your symptoms and let the AI provide guidance on what to do next. This is a supportive tool, not a medical diagnosis.
            </p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-slate-700">Symptoms</span>
                <textarea
                  rows="8"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Example: fever, cough, headache, body ache"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                />
              </label>
              <button
                onClick={handleCheck}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? "Analyzing..." : "Check Symptoms"}
              </button>
            </div>

            {result && (
              <div className="mt-10 rounded-[2rem] bg-[#f4fcf9] p-6 border border-[#d4f0e6]">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#01745d]">AI analysis</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Review your symptom summary below</p>
                  </div>
                </div>
                <div className="mt-6 whitespace-pre-wrap rounded-3xl bg-white p-6 text-slate-700 shadow-sm border border-slate-200">
                  {result}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-[#01947a] p-8 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
              <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Health assistant</p>
              <h3 className="mt-6 text-3xl font-semibold">AI-powered guidance</h3>
              <p className="mt-4 text-slate-100/90 leading-relaxed">
                Get suggestions for next steps, symptom monitoring, and when to seek care—all in a patient-friendly dashboard.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Quick tip</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Stay hydrated and rest well.</p>
                </div>
              </div>
              <p className="mt-5 text-slate-600">If symptoms worsen, contact your provider immediately through the appointments page.</p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="bg-white py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[#01947a] p-1.5 rounded-full text-white">
              <HeartPulse className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">RuralCare+</h2>
          </div>
          <p className="text-slate-500 mb-4">Smart Healthcare Solution for Rural Communities</p>
          <p className="text-sm text-slate-400">© 2026 RuralCare+. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default SymptomChecker;
