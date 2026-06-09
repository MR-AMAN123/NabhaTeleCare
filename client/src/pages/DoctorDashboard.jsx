import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Stethoscope, ClipboardList, ArrowRight, HeartPulse } from "lucide-react";

function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
              <p className="text-sm text-slate-500">Doctor dashboard</p>
            </div>
          </div>
</Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Doctor"}</span>
            <button onClick={handleLogout} className="rounded-full bg-[#01947a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
              <Stethoscope className="h-4 w-4" />
              Care management
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Welcome back, Dr.  {user?.name || "Healthcare"}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Review appointments, consult patients, and add records with the same trusted RuralCare+ theme.
              Your doctor workspace is clean, responsive, and built for quick action.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link to="/doctor/appointments" className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6 transition hover:-translate-y-1 hover:border-[#01947a] hover:bg-white">
                <p className="text-sm text-slate-500">Pending visits</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Quick approve</p>
                <p className="mt-4 text-sm text-[#01745d] font-semibold">View appointments</p>
              </Link>
              <Link to="/doctor/appointments" className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6 transition hover:-translate-y-1 hover:border-[#01947a] hover:bg-white">
                <p className="text-sm text-slate-500">Patient records</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Add notes</p>
                <p className="mt-4 text-sm text-[#01745d] font-semibold">Open appointments</p>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#01947a] p-10 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Doctor tools</p>
            <h3 className="mt-6 text-3xl font-semibold">Everything in one place</h3>
            <p className="mt-4 text-slate-100/90 leading-relaxed">
              Access the appointment list, join video consults, and create health records with a single click.
            </p>
            <div className="mt-8 grid gap-4">
              <Link to="/doctor/appointments" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                View Appointments <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/records" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Health Records <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link to="/doctor/appointments" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Appointments</h4>
            <p className="mt-3 text-slate-500">Review and manage your upcoming patient visits.</p>
          </Link>

          <Link to="/symptom-checker" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Symptom Checker</h4>
            <p className="mt-3 text-slate-500">Help patients assess symptoms quickly and confidently.</p>
          </Link>

          <Link to="/medicine-finder" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Medicine Finder</h4>
            <p className="mt-3 text-slate-500">Quickly locate medicines and pharmacy stock details.</p>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default DoctorDashboard;
