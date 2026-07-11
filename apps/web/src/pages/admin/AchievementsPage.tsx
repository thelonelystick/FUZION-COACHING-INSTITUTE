import Card from "../../components/ui/Card";

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Achievements</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Achievements</h1>
        <p className="mt-2 text-slate-600">Create and manage student/faculty achievements displayed on the public site.</p>
      </Card>
    </div>
  );
}
