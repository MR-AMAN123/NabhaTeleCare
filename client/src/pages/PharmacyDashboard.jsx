import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addMedicine } from "../services/medicineService";
import { Pill, ClipboardList, CheckCircle2, ArrowRight, HeartPulse } from "lucide-react";

function PharmacyDashboard() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMedicine({ name, quantity });
      alert("Medicine added successfully");
      setName("");
      setQuantity("");
    } catch (error) {
      alert("Unable to add medicine. Please try again.");
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
            <div className="bg-[#01947a] p-1.5 rounded-full text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              RuralCare<span className="text-[#01947a]">+</span>
            </h1>
          </Link>
        

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{user?.name || "Pharmacy"}</span>
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
              <Pill className="h-4 w-4" />
              Pharmacy management
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Manage stock and reservations</h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              Add new medicines to inventory, track reservations, and keep your pharmacy running smoothly with the RuralCare+ dashboard.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link to="/pharmacy-reservations" className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6 transition hover:-translate-y-1 hover:border-[#01947a] hover:bg-white">
                <p className="text-sm text-slate-500">Pending requests</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">View reservations</p>
                <p className="mt-4 text-sm text-[#01745d] font-semibold">Handle patient orders</p>
              </Link>
              <div className="rounded-3xl border border-slate-200 bg-[#f4fcf9] p-6">
                <p className="text-sm text-slate-500">Inventory</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Add medicine</p>
                <p className="mt-4 text-sm text-[#01745d] font-semibold">Keep stock updated</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#01947a] p-10 text-white shadow-[0_20px_60px_-20px_rgba(1,148,122,0.35)] border border-teal-300/20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-100/80">Pharmacy tools</p>
            <h3 className="mt-6 text-3xl font-semibold">Keep medicine flow smooth</h3>
            <p className="mt-4 text-slate-100/90 leading-relaxed">
              Quickly add new stock and jump directly to reservation management in one consistent interface.
            </p>
            <div className="mt-8 grid gap-4">
              <Link to="/pharmacy-reservations" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                View Reservations <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/medicine-finder" className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Medicine Finder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link to="/pharmacy-reservations" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Reservations</h4>
            <p className="mt-3 text-slate-500">Review patient medicine reservations and confirm orders.</p>
          </Link>

          <div className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Add Stock</h4>
            <p className="mt-3 text-slate-500">Quickly add medicine inventory and keep quantities updated.</p>
          </div>

          <Link to="/medicine-finder" className="group rounded-[1.75rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1f0e6] text-[#01947a]">
              <Pill className="h-6 w-6" />
            </div>
            <h4 className="mt-6 text-xl font-semibold text-slate-900">Medicine Finder</h4>
            <p className="mt-3 text-slate-500">Search medicine availability and locate stock faster.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
          <h3 className="text-2xl font-semibold text-slate-900">Add new medicine</h3>
          <p className="mt-3 text-slate-600">Enter a new medicine item to keep your pharmacy inventory up to date.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-500">Medicine Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Medicine name" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-500">Quantity</span>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10" required />
            </label>
            <div className="flex items-end">
              <button type="submit" className="w-full rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">
                Add Medicine
              </button>
            </div>
          </form>
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

export default PharmacyDashboard;
