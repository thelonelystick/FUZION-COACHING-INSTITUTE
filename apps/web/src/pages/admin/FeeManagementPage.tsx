import Card from "../../components/ui/Card";

export default function FeeManagementPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Fees</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fee Management</h1>
        <p className="mt-2 text-slate-600">Configure fee structures, view collections and generate receipts.</p>
      </Card>
    </div>
  );
}
