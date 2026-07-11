import Card from "../../components/ui/Card";

export default function ParentsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Parents</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Parents</h1>
        <p className="mt-2 text-slate-600">Manage parent accounts, link children and review fee statuses.</p>
      </Card>
    </div>
  );
}
