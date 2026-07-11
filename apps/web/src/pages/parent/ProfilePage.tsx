import Card from "../../components/ui/Card";
import { useAuth } from "../../contexts/AuthContext";

export default function ParentProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Parent • Profile</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user?.displayName ?? user?.email ?? "Profile"}</h1>
        <p className="mt-2 text-slate-600">Manage your contact details and linked children.</p>
      </Card>
    </div>
  );
}
