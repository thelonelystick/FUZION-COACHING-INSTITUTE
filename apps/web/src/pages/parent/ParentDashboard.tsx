import Card from "../../components/ui/Card";
import { useChildren, useParentPayments } from "../../lib/firestoreHooks";
import { useAuth } from "../../contexts/AuthContext";

export default function ParentDashboard() {
  const { user } = useAuth();
  const parentUid = user?.uid ?? null;
  // parent list not used in this view; keep hook calls light
  const { items: children, loading: childrenLoading } = useChildren(parentUid);
  const { items: payments, loading: paymentsLoading } = useParentPayments(parentUid);

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent portal</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user?.email ?? "Parent"} — Overview</h1>
        <p className="mt-2 text-slate-600">Quick view of your children, their attendance, marks and payments.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">My children</h2>
          {childrenLoading ? <p className="mt-3 text-sm text-slate-600">Loading children...</p> : null}
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {children.map((c) => (
              <li key={String(c.id)} className="rounded-lg border border-slate-100 p-2">• {String(c.name ?? c.displayName ?? c.id)} — {String(c.classLevel ?? c.course ?? "—")}</li>
            ))}
            {children.length === 0 && !childrenLoading ? <li className="text-sm text-slate-500">No children linked to this account.</li> : null}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Payments</h2>
          {paymentsLoading ? <p className="mt-3 text-sm text-slate-600">Loading payments...</p> : null}
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {payments.slice(0, 6).map((p) => (
              <li key={String(p.id)} className="rounded-lg border border-slate-100 p-2">• {String(p.amount ?? "—")} — {String(p.status ?? "—")}</li>
            ))}
            {payments.length === 0 && !paymentsLoading ? <li className="text-sm text-slate-500">No payments found.</li> : null}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Enrollment & actions</h2>
          <p className="mt-2 text-sm text-slate-600">Request enrollment, view active batches, or contact admissions from here.</p>
          <div className="mt-4 flex flex-col gap-2">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-white text-sm">Request new enrollment</button>
            <a className="text-sm text-slate-600 underline" href="/contact">Contact admissions</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
