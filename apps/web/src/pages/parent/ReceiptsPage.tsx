import Card from "../../components/ui/Card";

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent • Receipts</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Receipts</h1>
        <p className="mt-2 text-slate-600">Download past payment receipts and invoices.</p>
      </Card>
    </div>
  );
}
