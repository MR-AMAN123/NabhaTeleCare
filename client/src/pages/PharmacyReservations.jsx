import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, XCircle, ClipboardList, HeartPulse, ArrowRight } from "lucide-react";

function PharmacyReservations() {
  const [reservations, setReservations] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await API.get("/medicines/reservations");
      setReservations(data.reservations || []);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmReservation = async (id) => {
    try {
      await API.put(`/medicines/reservation/${id}/confirm`);
      fetchReservations();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await API.put(`/medicines/reservation/${id}/cancel`);
      fetchReservations();
    } catch (error) {
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
              <p className="text-sm text-slate-500">Pharmacy reservations</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/pharmacy" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
              Back to dashboard
            </Link>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Pharmacy"}</span>
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
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reservations</p>
              <h2 className="mt-3 text-4xl font-extrabold text-slate-900">Confirm patient medicine orders</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#f4fcf9] px-4 py-3 text-sm text-slate-600">
              <ClipboardList className="h-5 w-5 text-[#01947a]" />
              {reservations.length} requests
            </div>
          </div>
          <p className="mt-5 text-slate-600 leading-relaxed max-w-3xl">
            Review each medicine reservation, confirm availability, or cancel requests with one smooth workflow.
          </p>
        </div>

        <div className="grid gap-6">
          {reservations.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <p className="text-slate-500">No reservations found. Patient requests will appear here.</p>
            </div>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation._id} className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Patient</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{reservation.patient?.name || "Unknown"}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Medicine</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{reservation.medicine?.name || "Unknown"}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Quantity</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{reservation.quantity}</p>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-[#f4fcf9] p-4">
                      <p className="text-sm text-slate-500">Status</p>
                      <span className={`mt-2 inline-flex rounded-full px-3 py-2 text-sm font-semibold ${reservation.status === "PENDING" ? "bg-amber-100 text-amber-700" : reservation.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                        {reservation.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 xl:flex-col xl:items-end">
                    {reservation.status === "PENDING" ? (
                      <>
                        <button onClick={() => confirmReservation(reservation._id)} className="inline-flex items-center justify-center rounded-3xl bg-[#01947a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                          <CheckCircle2 className="h-4 w-4" />
                          Confirm
                        </button>
                        <button onClick={() => cancelReservation(reservation._id)} className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          <XCircle className="h-4 w-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
                        <ArrowRight className="h-4 w-4" />
                        {reservation.status === "CONFIRMED" ? "Confirmed" : "Cancelled"}
                      </div>
                    )}
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

export default PharmacyReservations;
