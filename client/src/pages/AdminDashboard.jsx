import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import AdminCharts from "../components/AdminCharts";
import DoctorWorkloadChart from "../components/DoctorWorkloadChart";
import MedicineAnalytics from "../components/MedicineAnalytics";
import { ArrowRight, BarChart3, ShieldCheck, Users, Activity } from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [workload, setWorkload] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchWorkload();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWorkload = async () => {
    try {
      const { data } = await API.get("/admin/doctor-workload");
      setWorkload(data.workload || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4fcf9] text-slate-900">
        <p className="rounded-3xl bg-white px-8 py-6 text-lg font-medium shadow-lg shadow-slate-200">Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4fcf9] text-slate-900 font-sans">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#01947a] p-2 rounded-xl text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">Admin dashboard</p>
            </div>
          </div>
</Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Administrator"}</span>
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
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
              <BarChart3 className="h-4 w-4" />
              Admin overview
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Welcome back, {user?.name || "Admin"}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Manage the platform with clarity, access fast analytics, and keep the care network running smoothly.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6">
                <p className="text-sm text-slate-500">Data updated</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Real time</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6">
                <p className="text-sm text-slate-500">Top action</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Review workload</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#01947a] p-10 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Admin tools</p>
            <h3 className="mt-6 text-3xl font-semibold">Clear platform control</h3>
            <p className="mt-4 text-slate-100/90 leading-relaxed">
              See the most important metrics at a glance and access analytics instantly for smarter decisions.
            </p>
            <div className="mt-8 grid gap-4">
              <Link to="/admin" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Refresh dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/symptom-checker" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Jump to AI symptom tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Patients</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalPatients || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Appointments</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalAppointments || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Records</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalRecords || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Doctors</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalDoctors || 0}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
            <h3 className="text-xl font-semibold text-slate-900">Platform analytics</h3>
            <p className="mt-3 text-slate-500">Track usage and performance across the network.</p>
            <div className="mt-8">
              <AdminCharts stats={stats} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
              <h3 className="text-xl font-semibold text-slate-900">Doctor workload</h3>
              <p className="mt-3 text-slate-500">Monitor how doctor capacity is distributed across facilities.</p>
              <div className="mt-6">
                <DoctorWorkloadChart workload={workload} />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
              <h3 className="text-xl font-semibold text-slate-900">Medicine analytics</h3>
              <p className="mt-3 text-slate-500">See inventory and reservation trends at a glance.</p>
              <div className="mt-6">
                <MedicineAnalytics />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[#01947a] p-1.5 rounded-full text-white">
              <ShieldCheck className="h-4 w-4" />
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

export default AdminDashboard;
