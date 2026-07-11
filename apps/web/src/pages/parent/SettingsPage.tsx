import Card from "../../components/ui/Card";
import { useAuth } from "../../contexts/AuthContext";

export default function ParentSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent • Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Account Settings</h1>
        <p className="mt-2 text-slate-600">Update password, notification preferences and linked devices for {user?.email ?? "your account"}.</p>
      </Card>
    </div>
  );
}
