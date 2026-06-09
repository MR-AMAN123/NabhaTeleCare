import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { dbPromise } from "../utils/db";
import { ArrowRight, HeartPulse, FileText, ShieldCheck } from "lucide-react";

function HealthRecords() {
  const [records, setRecords] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchRecords = async () => {
    try {
      const { data } = await API.get("/health-records/my-records");
      setRecords(data.records || []);

      const db = await dbPromise;
      for (const record of data.records || []) {
        await db.put("records", record);
      }
    } catch (error) {
      console.error("Using Offline Records", error);
      const db = await dbPromise;
      const offlineRecords = await db.getAll("records");
      setRecords(offlineRecords || []);
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
              <p className="text-sm text-slate-500">Health records</p>
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
        <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100 mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
                <FileText className="h-4 w-4" />
                Medical history
              </span>
              <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Access your health records</h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
                View diagnoses, prescriptions, and visit notes securely. Offline caching helps you stay connected even when your signal is limited.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-[#f4fcf9] px-5 py-4 text-sm text-slate-600">
              <ShieldCheck className="h-5 w-5 text-[#01947a]" />
              {records.length} records
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {records.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <p className="text-slate-500">No health records available yet. Records will appear after your appointments.</p>
            </div>
          ) : (
            records.map((record) => (
              <div key={record._id} className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-slate-900">{record.diagnosis || "Medical note"}</h3>
                    <div className="rounded-3xl bg-[#f4fcf9] p-4">
                      <p className="text-sm text-slate-500">Prescription</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{record.prescription || "Not specified"}</p>
                    </div>
                    <div className="rounded-3xl bg-[#f4fcf9] p-4">
                      <p className="text-sm text-slate-500">Notes</p>
                      <p className="mt-2 text-lg text-slate-700">{record.notes || "No additional notes."}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[#f4fcf9] p-6 border border-slate-200 max-w-md">
                    <p className="text-sm text-slate-500">Recorded on</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{new Date(record.createdAt || record.date || Date.now()).toLocaleDateString()}</p>
                    <Link to="/book-appointment" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                      Book follow-up
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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

export default HealthRecords;
