import { useState } from "react";
import { ArrowRight, Building2, GraduationCap, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }: { isActive: boolean }) => `text-sm font-medium transition-all duration-300 ${isActive ? "text-blue-700" : "text-slate-600 hover:text-blue-700"}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-100 sm:inline-flex">
              Schedule a Visit
            </Link>
            <button type="button" onClick={() => setAuthOpen(true)} className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-0.5">
              Login
            </button>
          </div>
        </nav>
      </header>
      {authOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 text-white shadow-[0_30px_120px_-24px_rgba(2,8,23,0.95)]">
            <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.24),_transparent_34%)] p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200">
                  <ShieldCheck size={15} /> Welcome back
                </div>
                <h3 className="mt-5 text-3xl font-semibold">Choose your portal and continue.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">Fast access for admin, teacher, student, and parent accounts with a polished, premium experience.</p>
                <div className="mt-6 space-y-3">
                  {[
                    { label: "Admin", icon: Building2 },
                    { label: "Teacher", icon: GraduationCap },
                    { label: "Student", icon: Sparkles },
                    { label: "Parent", icon: Users },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-200"><Icon size={16} /></div>
                        <span className="text-sm font-medium text-slate-100">{item.label} portal</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-white/95 p-8 text-slate-900 lg:p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Authentication</p>
                    <h4 className="mt-2 text-2xl font-semibold text-slate-900">Secure sign-in</h4>
                  </div>
                  <button type="button" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => setAuthOpen(false)}>Close</button>
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-600">
                  Use the dedicated login page for full access, or continue to the premium portal flow from the navigation shell.
                </div>
                <Link to="/login" onClick={() => setAuthOpen(false)} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5">
                  Continue to full login <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
