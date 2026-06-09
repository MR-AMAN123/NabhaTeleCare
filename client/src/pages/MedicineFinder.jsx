import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { ArrowRight, HeartPulse, Pill, Search, CheckCircle2 } from "lucide-react";

function MedicineFinder() {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [quantity, setQuantity] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const findMedicine = async () => {
    try {
      const { data } = await API.get(`/medicines/search?name=${search}`);
      setMedicines(data.medicines || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to search medicines.");
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const reserve = async (id) => {
    try {
      await API.post("/medicines/reserve", {
        medicineId: id,
        quantity: quantity[id] || 1,
      });
      alert("Reservation sent.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to reserve medicine.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fcf9] text-slate-900 font-sans">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#01947a] p-2 rounded-xl text-white">
              <Pill className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">RuralCare<span className="text-[#01947a]">+</span></h1>
              <p className="text-sm text-slate-500">Medicine Finder</p>
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
        <div className="rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] border border-slate-100">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d1f0e6] px-3 py-2 text-sm font-semibold text-[#01745d]">
                <Search className="h-4 w-4" />
                Search medicine availability
              </span>
              <h2 className="mt-6 text-4xl font-extrabold text-slate-900">Find medicines near you</h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
                Search across pharmacy stock and reserve medicines before you travel. See availability, quantity, and pharmacy contact details all in one place.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-[#f4fcf9] px-5 py-4 text-sm text-slate-600">
              <Pill className="h-5 w-5 text-[#01947a]" />
              {medicines.length} medicines found
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_0.6fr] items-end">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by medicine name"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
            />
            <button
              onClick={findMedicine}
              className="inline-flex items-center justify-center rounded-full bg-[#01947a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {medicines.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
              <p className="text-slate-500">Search for a medicine name to see available stock and make a reservation.</p>
            </div>
          ) : (
            medicines.map((medicine) => (
              <div key={medicine._id} className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-3xl bg-[#d1f0e6] p-4 text-[#01947a]">
                        <Pill className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{medicine.name}</h3>
                        <p className="text-sm text-slate-500">{medicine.pharmacy?.name || "Local pharmacy"}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Available</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{medicine.quantity || 0}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Pharmacy</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{medicine.pharmacy?.name || "Unknown"}</p>
                      </div>
                      <div className="rounded-3xl bg-[#f4fcf9] p-4">
                        <p className="text-sm text-slate-500">Contact</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{medicine.pharmacy?.phone || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 min-w-[220px]">
                    <label className="block">
                      <span className="mb-2 block text-sm text-slate-500">Reserve quantity</span>
                      <input
                        type="number"
                        min="1"
                        value={quantity[medicine._id] || 1}
                        onChange={(e) => handleQuantityChange(medicine._id, e.target.value)}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/10"
                      />
                    </label>
                    <button
                      onClick={() => reserve(medicine._id)}
                      className="inline-flex items-center justify-center rounded-full bg-[#01947a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Reserve
                    </button>
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

export default MedicineFinder;
