import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Video, 
  Bot, 
  Pill, 
  FileText, 
  Clock, 
  Wallet, 
  Heart 
} from "lucide-react";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath = user
    ? user.role === "DOCTOR"
      ? "/doctor"
      : user.role === "PHARMACY"
      ? "/pharmacy"
      : user.role === "ADMIN"
      ? "/admin"
      : "/patient"
    : "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to={dashboardPath} className="flex items-center gap-2">
            <div className="bg-[#01947a] p-1.5 rounded-full text-white">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              RuralCare<span className="text-[#01947a]">+</span>
            </h1>
          </Link>
          <div className="flex gap-6 items-center">
            {!user ? (
              <>
                <Link to="/login">
                  <span className="text-slate-800 font-medium hover:text-[#01947a] transition">
                    Login
                  </span>
                </Link>

                <Link to="/register">
                  <button className="bg-[#01947a] text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition shadow-sm">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#01947a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition shadow-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      {/* Notice the soft green gradient background similar to the image */}
      <section className="bg-gradient-to-br from-[#f4fcf9] to-[#e6f8f3] pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d1f0e6] text-[#01947a] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" />
              Trusted healthcare for villages
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Healthcare access for <span className="text-[#01947a]">every village</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Connect with doctors, check symptoms with AI, find medicines 
              and keep your health records — all in one simple app made for 
              rural families.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <button className="bg-[#01947a] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-teal-800 transition shadow-md">
                  Get Started <ArrowRight className="h-5 w-5" />
                </button>
              </Link>

           
<a 
  href="tel:104" 
  className="bg-white border-2 border-[#01947a] text-[#01947a] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#f4fcf9] transition cursor-pointer"
>
  <Phone className="h-5 w-5" />
  Call Helpline (104)
</a>
            </div>
          </div>

          
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] shadow-2xl overflow-hidden bg-white border-4 border-white">
            
            <img 
              src="/imgg1.jpg" 
              alt="RuralCare App Illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Everything you need for good health
            </h2>
            <p className="text-lg text-slate-500">
              Simple tools that work even on slow internet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="bg-[#d1f0e6] w-12 h-12 rounded-xl flex items-center justify-center text-[#01947a] mb-6">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Video Consultation
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Talk face-to-face with a doctor on your phone. No long travel needed.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="bg-[#d1f0e6] w-12 h-12 rounded-xl flex items-center justify-center text-[#01947a] mb-6">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Symptom Checker
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Describe how you feel and get instant, easy health guidance from AI.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="bg-[#d1f0e6] w-12 h-12 rounded-xl flex items-center justify-center text-[#01947a] mb-6">
                <Pill className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Medicine Finder
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Check which medicines are in stock nearby and reserve before you travel.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="bg-[#d1f0e6] w-12 h-12 rounded-xl flex items-center justify-center text-[#01947a] mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Health Records
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Keep all your prescriptions and reports safe — online and offline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="bg-[#eff9f6] pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-12">
            Why families choose RuralCare+
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="bg-[#e88e40] w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Save Time</h3>
              <p className="text-slate-500">
                Avoid long journeys and waiting queues. Get help in minutes.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="bg-[#e88e40] w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Save Money</h3>
              <p className="text-slate-500">
                Cut travel and repeat-visit costs. Affordable care for every family.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="bg-[#e88e40] w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Better Health</h3>
              <p className="text-slate-500">
                Faster access to doctors, medicines and trusted health info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & CTA SECTION */}
      <section className="bg-[#eff9f6] pb-24 relative -mt-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* STATS BANNER */}
          <div className="bg-[#01947a] rounded-3xl p-10 md:p-14 shadow-xl mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">173+</h1>
                <p className="font-medium text-teal-100">Villages Served</p>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">24/7</h1>
                <p className="font-medium text-teal-100">Healthcare Access</p>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI</h1>
                <p className="font-medium text-teal-100">Symptom Analysis</p>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">100%</h1>
                <p className="font-medium text-teal-100">Digital Records</p>
              </div>
            </div>
          </div>

          {/* CTA CARD */}
          <div className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Start your digital healthcare journey
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
              Connect with doctors and health services from anywhere — it only takes a minute to begin.
            </p>
            <Link to="/register">
              <button className="bg-[#01947a] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-teal-800 transition shadow-md">
                Register Now <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[#01947a] p-1.5 rounded-full text-white">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              RuralCare+
            </h2>
          </div>
          
          <p className="text-slate-500 mb-4">
            Smart Healthcare Solution for Rural Communities
          </p>
          
          <p className="text-sm text-slate-400">
            © 2026 RuralCare+. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;