import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react"; // Added for the logo

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      if (data.user.role === "PATIENT") navigate("/patient");
      if (data.user.role === "DOCTOR") navigate("/doctor");
      if (data.user.role === "PHARMACY") navigate("/pharmacy");
      if (data.user.role === "ADMIN") navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fcf9] to-[#e6f8f3] flex items-center justify-center px-4 py-12 font-sans">
      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        
        {/* Left Side: Info Panel */}
        <section className="rounded-[2rem] bg-[#01947a] p-10 shadow-2xl text-white sm:p-12 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          
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
              Trusted Healthcare
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Sign in to your healthy life.
            </h1>
            <p className="mt-5 max-w-xl text-teal-50 text-lg leading-relaxed">
              Securely access appointments, medical records, and medicine reservations from a calm, patient-focused dashboard.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">Book appointments</p>
                <p className="mt-1 text-teal-100 text-sm">Find the right doctor and schedule visits in seconds.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-bold text-white text-lg">View records</p>
                <p className="mt-1 text-teal-100 text-sm">Keep your history and prescriptions easily accessible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Form */}
        <main className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-slate-900 outline-none transition focus:border-[#01947a] focus:ring-2 focus:ring-[#01947a]/20"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[#01947a] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-teal-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#01947a]/50 mt-4"
            >
              Login
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500 text-center">
            <p>
              New to the app?{' '}
              <Link to="/register" className="font-bold text-[#01947a] transition hover:text-teal-800">
                Create an account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;