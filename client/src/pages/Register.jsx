import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // Added for logo

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    village: "",
    role: "PATIENT",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", formData);
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fcf9] to-[#e6f8f3] flex items-center justify-center px-4 py-12 font-sans">
      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
        
        {/* Left Side: Form */}
        <main className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 order-2 lg:order-1">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Join the health network</h2>
            <p className="mt-2 text-slate-500">
              Register once and manage appointments, prescriptions, and records from one portal.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Village</span>
                <input
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="Village name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20 cursor-pointer"
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="PHARMACY">Pharmacy</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[#01947a] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-teal-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#01947a]/50 mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#01947a] transition hover:text-teal-800">
                Sign in here
              </Link>
            </p>
          </div>
        </main>

        {/* Right Side: Info Panel */}
        <section className="rounded-[2rem] bg-[#01947a] p-10 shadow-2xl text-white sm:p-12 relative overflow-hidden order-1 lg:order-2">
          {/* Decorative background element */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-10">
              <div className="bg-white p-1.5 rounded-full text-[#01947a]">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                RuralCare+
              </span>
            </Link>

            <span className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
              Patient Friendly
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Ready to start your care journey?
            </h1>
            <p className="mt-5 max-w-xl text-teal-50 text-lg leading-relaxed">
              Whether you are a patient, doctor, pharmacy or admin, sign up and use the same secure health network.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">Trusted access</p>
                <p className="mt-1 text-teal-100 text-sm">Strong authentication with a friendly onboarding experience.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">Smart onboarding</p>
                <p className="mt-1 text-teal-100 text-sm">Choose your role and begin using your dashboard right away.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Register;