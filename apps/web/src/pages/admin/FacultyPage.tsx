import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import { useDashboardStats } from "../../lib/firestoreHooks";
import { updateUserStatus, assignTeacherCourse } from "../../lib/authHelpers";

export default function FacultyPage() {
  const { items: users, loading, error } = useDashboardStats("users");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [courseDraft, setCourseDraft] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");

  const teachers = useMemo(() => {
    const q = String(query ?? "").trim().toLowerCase();
    return (users ?? []).filter((u) => String(u.role ?? "").toLowerCase() === "teacher").filter((u) => {
      if (!q) return true;
      const email = String(u.email ?? "");
      const name = String(u.name ?? u.displayName ?? "");
      const id = String(u.uid ?? u.id ?? "");
      return [email, name, id].some((s) => s.toLowerCase().includes(q));
    });
  }, [users, query]);

  async function handleStatusChange(uid: string, status: "Active" | "Suspended") {
    if (!confirm(`Set teacher ${uid} status to ${status}?`)) return;
    setBusyId(uid);
    try {
      await updateUserStatus(uid, status);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  }

  async function handleAssign(uid: string) {
    const course = courseDraft[uid] ?? "Mathematics";
    if (!confirm(`Assign course '${course}' to teacher ${uid}?`)) return;
    setBusyId(uid);
    try {
      await assignTeacherCourse(uid, course);
      setCourseDraft((d) => ({ ...d, [uid]: "" }));
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200/70 bg-white/95 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Faculty</h1>
            <p className="mt-1 text-sm text-slate-500">Manage teacher accounts, assign courses, and change statuses.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or id"
              className="rounded-full border border-slate-200 px-4 py-2 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <p className="text-sm text-slate-600">Loading teachers...</p>
          ) : error ? (
            <p className="text-sm text-rose-600">{error}</p>
          ) : (
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-3 py-2 font-medium">Account</th>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Course</th>
                  <th className="px-3 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((u) => {
                  const uid = String(u.uid ?? u.id ?? "");
                  const email = String(u.email ?? uid);
                  const name = String((u.name as string | undefined) ?? (u.displayName as string | undefined) ?? "-");
                  const status = String((u.status as string | undefined) ?? "Active");
                  return (
                    <tr key={uid} className="border-b border-slate-200/70 last:border-b-0">
                      <td className="px-3 py-3">{email}</td>
                      <td className="px-3 py-3">{name}</td>
                      <td className="px-3 py-3">{status}</td>
                      <td className="px-3 py-3">{String((u.course as string | undefined) ?? "—")}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2 items-center">
                          <input value={courseDraft[uid] ?? ""} onChange={(e) => setCourseDraft({ ...courseDraft, [uid]: e.target.value })} placeholder="Course" className="rounded-full border border-slate-200 px-3 py-2" />
                          <button disabled={busyId === uid} onClick={() => handleAssign(uid)} className="rounded-full bg-blue-600 px-3 py-2 text-white text-sm">{busyId === uid ? "Working..." : "Assign"}</button>
                          <button disabled={busyId === uid} onClick={() => handleStatusChange(uid, "Active")} className="rounded-full bg-slate-800 px-3 py-2 text-white text-sm">Active</button>
                          <button disabled={busyId === uid} onClick={() => handleStatusChange(uid, "Suspended")} className="rounded-full bg-rose-600 px-3 py-2 text-white text-sm">Suspend</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
