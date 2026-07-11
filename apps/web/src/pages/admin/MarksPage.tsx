import Card from "../../components/ui/Card";

export default function MarksPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Marks</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Marks Management</h1>
        <p className="mt-2 text-slate-600">Overview of marks, bulk uploads and exam setup tools.</p>
      </Card>
    </div>
  );
}
