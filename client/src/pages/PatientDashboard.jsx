import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Search,
  HeartPulse,
  ShieldCheck,
  Activity,
  Pill,
  AlertCircle,
  Video,
} from "lucide-react";

function PatientDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [videoAppointment, setVideoAppointment] = useState(null);

  useEffect(() => {
    fetchMyAppointments();
    const interval = setInterval(fetchMyAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMyAppointments = async () => {
    try {
      const { data } = await API.get("/appointments/my");
      const started = (data.appointments || []).find(
        (appointment) => appointment.videoStartedAt
      );
      setVideoAppointment(started || null);
    } catch (error) {
      console.error("Failed to load video appointment notification:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4fcf9] text-slate-900 font-sans">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#01947a] p-2 rounded-xl text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">Patient dashboard</p>
            </div>
          </div>
</Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              {user?.name || "Patient"}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#01947a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {videoAppointment && (
          <div className="mb-8 rounded-[2rem] bg-emerald-50 p-6 border border-emerald-200 shadow-[0_16px_40px_-24px_rgba(16,185,129,0.25)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-emerald-600 p-3 text-white">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">Video call alert</p>
                  <p className="mt-2 text-lg font-semibold text-emerald-900">Your doctor is ready for a video consultation.</p>
                  <p className="mt-1 text-sm text-emerald-800">
                    Appointment with Dr. {videoAppointment.doctor?.name || "your doctor"} on {videoAppointment.date} at {videoAppointment.time}.
                  </p>
                </div>
              </div>
              <a
                href={
                  videoAppointment.meetingRoom
                    ? `https://meet.jit.si/${videoAppointment.meetingRoom}`
                    : "#"
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Video className="h-4 w-4" />
                Join Video
              </a>
            </div>
          </div>
        )}

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
              <ShieldCheck className="h-4 w-4" />
              Secure health access
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Welcome back, {user?.name || "Healthy Patient"}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Manage your appointments, records, medicines and symptom checks in one place.
              Your digital health journey is safe, simple, and built for rural families.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link to="/book-appointment" className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6 transition hover:-translate-y-1 hover:border-[#01947a] ">
              <div className="  bg-[#f4fcf9] p-6">
                <p className="text-sm text-slate-500">Next appointment</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Book now</p>
              </div>
              </Link>
              <div className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6">
                <p className="text-sm text-slate-500">Health records</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Always available</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#01947a] p-10 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Your care hub</p>
            <h3 className="mt-6 text-3xl font-semibold">Fast access to key actions</h3>
            <p className="mt-4 text-slate-100/90 leading-relaxed">
              Quickly navigate to the tools you use most to stay healthy and connected.
            </p>
            <div className="mt-8 grid gap-4">
              <Link to="/book-appointment" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/symptom-checker" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                AI Symptom Checker <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link to="/book-appointment" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <BookOpen className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Book Appointment</h4>
            <p className="mt-3 text-slate-500">Choose a doctor and schedule a visit in minutes.</p>
          </Link>

          <Link to="/appointments" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <Activity className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">My Appointments</h4>
            <p className="mt-3 text-slate-500">Review upcoming and past visits in one place.</p>
          </Link>

          <Link to="/records" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <FileText className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Health Records</h4>
            <p className="mt-3 text-slate-500">Access medical history, prescriptions, and reports securely.</p>
          </Link>

          <Link to="/search-medicine" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Search Medicine</h4>
            <p className="mt-3 text-slate-500">Check medicine availability and reserve before you travel.</p>
          </Link>

          <Link to="/medicine-finder" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <Pill className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Medicine Finder</h4>
            <p className="mt-3 text-slate-500">Search nearby medicines and see availability faster.</p>
          </Link>

          <Link to="/symptom-checker" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">AI Symptom Checker</h4>
            <p className="mt-3 text-slate-500">Use AI to understand symptoms and choose next steps.</p>
          </Link>

        
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

export default PatientDashboard;