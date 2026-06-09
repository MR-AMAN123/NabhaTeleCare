import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { HeartPulse, BookOpen, Calendar } from "lucide-react";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/appointments", { doctor, date, time, reason });
      alert("Appointment booked successfully.");
      setDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to book appointment.");
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
          <div className="flex items-center gap-3">
            <div className="bg-[#01947a] p-2 rounded-xl text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">Book appointment</p>
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
              <Calendar className="h-4 w-4" />
              Appointment booking
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Schedule your next visit</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Select a doctor, choose the time that works for you, and let us know why you're coming in.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-500">Choose doctor</span>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                  required
                >
                  <option value="">Select doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name}{doc.specialty ? ` - ${doc.specialty}` : ""}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-500">Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-500">Time</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-500">Reason for visit</span>
                <textarea
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell the doctor why you need care"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                  required
                />
              </label>

              <button className="inline-flex items-center justify-center rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700">
                Book Appointment
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-[#01947a] p-8 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
              <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Ready to care</p>
              <h3 className="mt-6 text-3xl font-semibold">Find the right doctor fast</h3>
              <p className="mt-4 text-slate-100/90 leading-relaxed">
                Choose from available doctors and schedule a visit with confidence. Your appointment details are saved for easy review.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-[#d1f0e6] p-3 text-[#01745d]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">How it works</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Select, confirm, and arrive prepared</p>
                </div>
              </div>
              <p className="mt-5 text-slate-600">Book an appointment, then return to the dashboard for health records, symptom checks, and medicine search.</p>
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

export default BookAppointment;
