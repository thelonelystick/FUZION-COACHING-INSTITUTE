import Card from "../../components/ui/Card";

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent • Attendance</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Attendance</h1>
        <p className="mt-2 text-slate-600">Review attendance records for your children.</p>
      </Card>
    </div>
  );
}
