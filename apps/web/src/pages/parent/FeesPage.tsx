import Card from "../../components/ui/Card";

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent • Fees</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fees & Payments</h1>
        <p className="mt-2 text-slate-600">View fee schedules, pending invoices and make payments.</p>
      </Card>
    </div>
  );
}
