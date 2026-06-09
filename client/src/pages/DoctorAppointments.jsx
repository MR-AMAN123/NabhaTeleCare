import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  CalendarDays,
  User,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Video,
  PlusCircle,
  HeartPulse,
} from "lucide-react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [recordData, setRecordData] = useState({ diagnosis: "", prescription: "", notes: "" });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const recordSectionRef = useRef(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (selectedAppointment && recordSectionRef.current) {
      recordSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAppointment]);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/doctor/appointments");
      setAppointments(data.appointments || []);
    } catch (error) {
      console.log(error);
    }
  };

  const approveAppointment = async (id) => {
    try {
      await API.put(`/doctor/appointments/${id}/approve`);
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      await API.put(`/doctor/appointments/${id}/reject`);
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const createRecord = async () => {
    try {
      await API.post(`/doctor/appointments/${selectedAppointment}/record`, recordData);
      alert("Health Record Created");
      setSelectedAppointment(null);
      setRecordData({ diagnosis: "", prescription: "", notes: "" });
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const startVideoCall = async (id) => {
    try {
      const result = await API.post(`/doctor/appointments/${id}/start-video`);
      alert("Patient has been notified! Video call started.");
      fetchAppointments();
    } catch (error) {
      alert("Unable to start video call. Please try again.");
      console.log(error);
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
              <p className="text-sm text-slate-500">Doctor appointment center</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/doctor" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
              Back to dashboard
            </Link>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Doctor"}</span>
            <button onClick={handleLogout} className="rounded-full bg-[#01947a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-200/30 transition hover:bg-teal-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100 mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Appointments</p>
              <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Manage your patient visits</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#f4fcf9] px-4 py-3 text-sm text-slate-600">
              <CalendarDays className="h-5 w-5 text-[#01947a]" />
              {appointments.length} scheduled
            </div>
          </div>
          <p className="mt-5 text-slate-600 leading-relaxed max-w-3xl">
            Approve or reject pending bookings, join video consultations, and add structured health records right from your dashboard.
          </p>
        </div>

        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <p className="text-slate-500">No appointments are available right now.</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment._id} className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-slate-500">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm text-[#01745d]">
                        <User className="h-4 w-4" />
                        {appointment.patient?.name || "Unknown patient"}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f4fcf9] px-3 py-2 text-sm text-slate-600">
                        <CalendarDays className="h-4 w-4" />
                        {appointment.date} · {appointment.time}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f4fcf9] px-3 py-2 text-sm text-slate-600">
                        <ClipboardList className="h-4 w-4" />
                        {appointment.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900">{appointment.reason || "General consultation"}</h3>
                    <p className="text-slate-600">Patient notes: {appointment.notes || "No additional details provided."}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 xl:justify-end">
                    {appointment.status === "PENDING" ? (
                      <>
                        <button onClick={() => approveAppointment(appointment._id)} className="rounded-3xl bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                          Approve
                        </button>
                        <button onClick={() => rejectAppointment(appointment._id)} className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="grid gap-3">
                        <button onClick={() => startVideoCall(appointment._id)} className="inline-flex items-center justify-center rounded-3xl bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                          <Video className="h-4 w-4 mr-2" />
                          Notify & Start Video
                        </button>
                        <Link to={appointment.meetingRoom ? `https://meet.jit.si/${appointment.meetingRoom}` : "#"} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-3xl bg-[#f4fcf9] px-5 py-3 text-sm font-semibold text-[#01745d] transition hover:bg-[#e6f8f3]">
                          <Video className="h-4 w-4" />
                          Join Video
                        </Link>
                        <button onClick={() => setSelectedAppointment(appointment._id)} className="inline-flex items-center justify-center rounded-3xl bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                          <PlusCircle className="h-4 w-4" />
                          Add Record
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedAppointment && (
          <div ref={recordSectionRef} className="mt-10 rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Create Health Record</h3>
                <p className="mt-2 text-slate-500">Save diagnosis, prescription, and notes for your patient.</p>
              </div>
              <button onClick={() => setSelectedAppointment(null)} className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
                Cancel
              </button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-500">Diagnosis</span>
                <input type="text" value={recordData.diagnosis} onChange={(e) => setRecordData({ ...recordData, diagnosis: e.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-500">Prescription</span>
                <input type="text" value={recordData.prescription} onChange={(e) => setRecordData({ ...recordData, prescription: e.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10" />
              </label>
              <label className="block md:col-span-3">
                <span className="mb-2 block text-sm text-slate-500">Notes</span>
                <textarea value={recordData.notes} onChange={(e) => setRecordData({ ...recordData, notes: e.target.value })} rows={4} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10" />
              </label>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={createRecord} className="inline-flex items-center gap-2 rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                <CheckCircle2 className="h-4 w-4" />
                Save Record
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DoctorAppointments;
