import Card from "../../components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Reports</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Reports</h1>
        <p className="mt-2 text-slate-600">Generate, filter and export reports for students, fees and attendance.</p>
      </Card>
    </div>
  );
}
