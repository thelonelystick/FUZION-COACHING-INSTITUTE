import { useMemo, useState } from "react";
import { ArrowRight, Building2, Eye, EyeOff, GraduationCap, ShieldCheck, Sparkles, Users } from "lucide-react";
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
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const submitLabel = useMemo(() => (mode === "login" ? "Sign In" : "Create Account"), [mode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const resolvedRole = await signIn(email, password, rememberMe);
        navigate(roleToPath[resolvedRole ?? role]);
      } else {
        const resolvedRole = await signUp(email, password, role, { name, createdAt: new Date().toISOString() });
        navigate(roleToPath[resolvedRole ?? role]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to complete the request");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email to receive a reset link.");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess("Password reset link sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send the reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex min-h-[82vh] items-center justify-center py-10 sm:py-12">
      <Card className="w-full max-w-6xl overflow-hidden border border-blue-100 bg-white/95 p-0 shadow-[0_32px_120px_-24px_rgba(37,99,235,0.18)]">
        <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-[linear-gradient(135deg,_#eff6ff_0%,_#dbeafe_100%)] p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.3em] text-blue-700">
              <ShieldCheck size={15} /> Secure gateway
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Access your portal in seconds.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Role-based login, one-device protection, and instant redirection to the correct dashboard.</p>
            <div className="mt-6 grid gap-3">
              {roleOptions.map((option) => (
                <button key={option.value} type="button" className={`rounded-2xl border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${role === option.value ? "border-blue-600 bg-blue-600/10" : "border-slate-200 bg-white/70"}`} onClick={() => setRole(option.value)}>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    {option.value === "admin" ? <Building2 size={14} /> : option.value === "teacher" ? <GraduationCap size={14} /> : option.value === "parent" ? <Users size={14} /> : <Sparkles size={14} />}
                    {option.label}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 text-slate-900 lg:p-10">
            <div className="flex gap-2 rounded-full bg-slate-100 p-1">
              <button type="button" className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${mode === "login" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20" : "text-slate-600"}`} onClick={() => setMode("login")}>Login</button>
              <button type="button" className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${mode === "signup" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20" : "text-slate-600"}`} onClick={() => setMode("signup")}>Sign Up</button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <label className="grid gap-2 text-sm text-slate-700">
                  <span className="font-medium">Display Name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" placeholder="Enter your full name" />
                </label>
              ) : null}
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Email Address</span>
                <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" placeholder="name@fuzioncoaching.in" />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Password</span>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 pr-12 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" placeholder="••••••••" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword((value) => !value)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              {mode === "login" ? (
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <label className="flex items-center gap-2">
                    <input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    Remember me
                  </label>
                  <button type="button" className="font-semibold text-blue-700" onClick={handleForgotPassword}>Forgot password?</button>
                </div>
              ) : null}
              <label className="grid gap-2 text-sm text-slate-700">
                <span className="font-medium">Access Level</span>
                <select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                  {roleOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}
              {success ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</p> : null}
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" type="submit" disabled={loading}>
                {loading ? "Please wait..." : submitLabel} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </Card>
    </Container>
  );
}
