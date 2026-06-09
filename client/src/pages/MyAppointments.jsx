import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { HeartPulse, Activity, Calendar, Video, AlertCircle } from "lucide-react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    // Poll for updates every 5 seconds to detect when doctor starts video
    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments/my");
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getStatusClasses = (status) => {
    if (status === "CONFIRMED") return "bg-emerald-100 text-emerald-700";
    if (status === "CANCELLED") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700";
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
              <p className="text-sm text-slate-500">My appointments</p>
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
                <Activity className="h-4 w-4" />
                Appointment overview
              </span>
              <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Track your upcoming visits</h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
                Review confirmed appointments, upcoming visits, and care details in one place.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-[#f4fcf9] px-5 py-4 text-sm text-slate-600">
              <Calendar className="h-5 w-5 text-[#01947a]" />
              {appointments.length} appointments
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <p className="text-slate-500">No appointments found. Book a visit from the dashboard.</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment._id} className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                {appointment.videoStartedAt && (
                  <div className="mb-6 flex flex-col gap-3 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-emerald-900">Doctor is ready! Video call in progress</p>
                        <p className="text-sm text-emerald-700">Click join below to enter the video consultation</p>
                      </div>
                    </div>
                    <Link
                      to={appointment.meetingRoom ? `https://meet.jit.si/${appointment.meetingRoom}` : "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-3xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <Video className="h-4 w-4" />
                      Join Now
                    </Link>
                  </div>
                )}
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-slate-900">{appointment.doctor?.name || "Doctor"}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Status</p>
                        <span className={`mt-2 inline-flex rounded-full px-3 py-2 text-sm font-semibold ${getStatusClasses(appointment.status)}`}>
                          {appointment.status || "PENDING"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-3xl bg-[#f4fcf9] p-4">
                    <div>
                      <p className="text-sm text-slate-500">Specialty</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.doctor?.specialty || "General care"}</p>
                    </div>
                    <Link to="/records" className="rounded-full bg-[#01947a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700">
                      View records
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

export default MyAppointments;
