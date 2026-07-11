import { useMemo, useState } from "react";
import { ArrowRight, Building2, GraduationCap, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";
import { useAuth } from "../../contexts/AuthContext";

type Mode = "login" | "signup";
type UserRole = "student" | "teacher" | "parent" | "admin";

const roleOptions: Array<{ label: string; value: UserRole; description: string }> = [
  { label: "Student", value: "student", description: "Attendance, tests, and study material." },
  { label: "Teacher", value: "teacher", description: "Notes, videos, and live classes." },
  { label: "Parent", value: "parent", description: "Progress updates and milestone alerts." },
  { label: "Admin", value: "admin", description: "Admissions, users, and institute controls." },
];

const roleToPath: Record<UserRole, string> = {
  student: "/student",
  teacher: "/teacher",
  parent: "/parent",
  admin: "/admin",
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const submitLabel = useMemo(() => (mode === "login" ? "Sign In" : "Create Account"), [mode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, role, { name, createdAt: new Date().toISOString() });
      }
      navigate(roleToPath[role]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete the request");
    }
  };

  return (
    <Container className="flex min-h-[82vh] items-center justify-center py-10 sm:py-12">
      <Card className="w-full max-w-6xl overflow-hidden border border-white/50 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-0 text-white shadow-[0_32px_120px_-24px_rgba(15,23,42,0.8)]">
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.28),_transparent_34%)] p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <ShieldCheck size={15} /> Secure gateway
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Access your portal in seconds.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Role-based login, one-device protection, and instant redirection to the correct dashboard.</p>
            <div className="mt-6 grid gap-3">
              {roleOptions.map((option) => (
                <button key={option.value} type="button" className={`rounded-2xl border px-4 py-3 text-left transition-all duration-300 transform hover:-translate-y-0.5 ${role === option.value ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-white/5"}`} onClick={() => setRole(option.value)}>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    {option.value === "admin" ? <Building2 size={14} /> : option.value === "teacher" ? <GraduationCap size={14} /> : option.value === "parent" ? <Users size={14} /> : <Sparkles size={14} />}
                    {option.label}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white/95 p-8 text-slate-900 lg:p-10">
            <div className="flex gap-2 rounded-full bg-slate-100 p-1">
              <button type="button" className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${mode === "login" ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20" : "text-slate-600"}`} onClick={() => setMode("login")}>Login</button>
              <button type="button" className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${mode === "signup" ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20" : "text-slate-600"}`} onClick={() => setMode("signup")}>Sign Up</button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <label className="grid gap-2 text-sm text-slate-700">
                  <span className="font-medium">Display Name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Enter your full name" />
                </label>
              ) : null}
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Email Address</span>
                <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="name@fuzion.co" />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Password</span>
                <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="••••••••" />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Access Level</span>
                <select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20">
                  {roleOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">
                {submitLabel} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </Card>
    </Container>
  );
}
