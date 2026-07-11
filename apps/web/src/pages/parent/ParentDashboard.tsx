import Card from "../../components/ui/Card";
import { useDashboardStats } from "../../lib/firestoreHooks";

export default function ParentDashboard() {
  const { items, loading, error } = useDashboardStats("parents");

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent portal</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Aarav’s progress overview</h1>
        <p className="mt-2 text-slate-600">Monthly attendance trend, marks analytics, and fee records are all available here.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Attendance</h2>
          <p className="mt-2 text-sm text-slate-600">This month: 94% • Last month: 90%</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Fee history</h2>
          {loading ? <p className="mt-3 text-sm text-slate-600">Loading parent records...</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {items.slice(0, 3).map((item) => (
              <li key={String(item.id)} className="rounded-lg border border-slate-100 p-2">• {String(item.name ?? item.email ?? item.id)}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
