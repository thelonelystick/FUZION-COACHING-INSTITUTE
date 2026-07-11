import { useMemo } from "react";
import { CalendarClock, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import Card from "../../components/ui/Card";
import { useAdmissions } from "../../lib/firestoreHooks";

export default function StudentDashboard() {
  const { items, loading, error } = useAdmissions();
  const summary = useMemo(() => ({
    totalApplications: items.length,
    latestStatus: items[0]?.status ?? "Pending review",
  }), [items]);

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-7 text-white shadow-[0_25px_90px_-25px_rgba(15,23,42,0.65)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Student portal</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back, Arjun</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">Track your progress, upcoming classes, and study resources from a single premium workspace.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">Goal-focused mode</div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Attendance", value: "92%", icon: ShieldCheck },
          { label: "Upcoming CBT", value: "Physics Mock", icon: CalendarClock },
          { label: "Fee status", value: "Paid", icon: GraduationCap },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border border-slate-200/70 bg-white/85 p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-700"><Icon size={18} /></div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><Sparkles size={16} /><h2 className="text-xl font-semibold text-slate-900">Today’s plan</h2></div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• 7:30 AM — Live Mathematics revision</li>
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• 9:00 AM — Doubt session with faculty</li>
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• 6:00 PM — Test review and feedback</li>
          </ul>
        </Card>
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><ShieldCheck size={16} /><h2 className="text-xl font-semibold text-slate-900">Admissions sync</h2></div>
          {loading ? <p className="mt-3 text-sm text-slate-600">Loading admissions...</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• Total linked applications: {summary.totalApplications}</li>
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• Latest status: {String(summary.latestStatus)}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
