import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { Cpu, ArrowRight } from "lucide-react";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data.appointments || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">Appointments overview</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Patient"}</span>
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
        <div className="rounded-4xl bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100 mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
                <Cpu className="h-4 w-4" />
                Smart appointments
              </span>
              <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Your upcoming visits</h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
                Review confirmed appointments and see the latest status updates in a clean, AI-friendly interface.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-[#f4fcf9] px-5 py-4 text-sm text-slate-600">
              <p className="text-slate-500">Total appointments</p>
              <p className="text-2xl font-semibold text-slate-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
            <p className="text-slate-500">No appointments yet. Book one or use the AI symptom checker to guide your next visit.</p>
            <Link
              to="/book-appointment"
              className="mt-6 inline-flex rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Book appointment
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="rounded-4xl bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-3xl bg-[#d1f0e6] p-3 text-[#01947a]">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{appointment.doctor?.name || "Doctor"}</h3>
                        <p className="text-sm text-slate-500">Status: {appointment.status || "PENDING"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Patient</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.patient?.name || "Unknown"}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Date</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.date}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Time</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.time}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Reason</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.reason || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-[#f4fcf9] p-6 border border-slate-200 max-w-md">
                    <p className="text-sm text-slate-500">Need a quick check?</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Use AI symptom checker</p>
                    <Link
                      to="/symptom-checker"
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                      Open checker <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ViewAppointments;
