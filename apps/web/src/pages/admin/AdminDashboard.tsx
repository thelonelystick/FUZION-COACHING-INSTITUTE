import { useState } from "react";
import { BookOpenText, CircleDollarSign, ShieldCheck, Users } from "lucide-react";
import Card from "../../components/ui/Card";
import { useAdmissions, useDashboardStats } from "../../lib/firestoreHooks";
import { approveAdmission, assignTeacherCourse, rejectAdmission, updateUserStatus } from "../../lib/authHelpers";

export default function AdminDashboard() {
  const { items: admissions, loading: admissionsLoading, error: admissionsError } = useAdmissions();
  const { items: teachers } = useDashboardStats("teachers");
  const { items: users, loading: usersLoading, error: usersError } = useDashboardStats("users");
  const [courseDraft, setCourseDraft] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleStatusChange = async (uid: string, status: "Active" | "Suspended") => {
    setBusyId(uid);
    try {
      await updateUserStatus(uid, status);
    } finally {
      setBusyId(null);
    }
  };

  const handleCourseAssign = async (uid: string) => {
    setBusyId(uid);
    try {
      await assignTeacherCourse(uid, courseDraft[uid] ?? "Mathematics");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdmissionDecision = async (admissionId: string, action: "approve" | "reject") => {
    setBusyId(admissionId);
    try {
      if (action === "approve") await approveAdmission(admissionId);
      else await rejectAdmission(admissionId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-7 text-white shadow-[0_25px_90px_-25px_rgba(15,23,42,0.65)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Administration control center</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Live institute overview</h1>
          </div>
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">Premium operations mode</div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Students", value: admissions.length, icon: Users },
          { label: "Teachers", value: teachers.length, icon: BookOpenText },
          { label: "Fee collections", value: "₹18.4L", icon: CircleDollarSign },
          { label: "Pending dues", value: "₹3.2L", icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border border-slate-200/70 bg-white/85 p-5 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-700"><Icon size={18} /></div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="border border-slate-200/70 bg-white/85 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Admissions queue</h2>
        {admissionsLoading ? <p className="mt-3 text-sm text-slate-600">Loading admissions...</p> : null}
        {admissionsError ? <p className="mt-3 text-sm text-rose-600">{admissionsError}</p> : null}
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {admissions.slice(0, 6).map((admission) => (
            <li key={String(admission.id)} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">
              <span>• {String(admission.studentName ?? admission.phone ?? admission.id)} — {String(admission.status ?? "Pending")}</span>
              <div className="flex gap-2">
                <button className="rounded-full bg-emerald-600 px-3 py-2 font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => handleAdmissionDecision(String(admission.id), "approve")}>{busyId === admission.id ? "Working..." : "Approve"}</button>
                <button className="rounded-full bg-rose-600 px-3 py-2 font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => handleAdmissionDecision(String(admission.id), "reject")}>{busyId === admission.id ? "Working..." : "Reject"}</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="border border-slate-200/70 bg-white/85 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Account management</h2>
        {usersLoading ? <p className="mt-3 text-sm text-slate-600">Loading users...</p> : null}
        {usersError ? <p className="mt-3 text-sm text-rose-600">{usersError}</p> : null}
        <div className="mt-4 overflow-x-auto rounded-[1.4rem] border border-slate-200/80 bg-slate-50/70 p-2">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2 font-medium">Account</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Course</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 6).map((user) => {
                const uid = String(user.id ?? "");
                const role = String(user.role ?? "student");
                const email = String((user.email as string | undefined) ?? user.id ?? "Pending");
                const status = String((user.status as string | undefined) ?? "Active");
                return (
                  <tr key={uid} className="border-b border-slate-200/70 last:border-b-0">
                    <td className="px-3 py-3">{email}</td>
                    <td className="px-3 py-3 capitalize">{role}</td>
                    <td className="px-3 py-3">{status}</td>
                    <td className="px-3 py-3">{String((user.course as string | undefined) ?? "—")}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded-full bg-slate-800 px-3 py-2 text-white transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => handleStatusChange(uid, "Active")}>Active</button>
                        <button className="rounded-full bg-amber-600 px-3 py-2 text-white transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => handleStatusChange(uid, "Suspended")}>Suspend</button>
                        {role === "teacher" ? (
                          <div className="flex gap-2">
                            <input value={courseDraft[uid] ?? ""} onChange={(event) => setCourseDraft({ ...courseDraft, [uid]: event.target.value })} className="rounded-full border border-slate-200 bg-white px-3 py-2 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Course" />
                            <button className="rounded-full bg-blue-600 px-3 py-2 text-white transition-all duration-300 transform hover:-translate-y-0.5" onClick={() => handleCourseAssign(uid)}>Assign</button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
