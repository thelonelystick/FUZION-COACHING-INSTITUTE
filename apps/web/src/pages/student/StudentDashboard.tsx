import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";
import { useAuth } from "../../contexts/AuthContext";
import { subscribeStudentSnapshot } from "../../services/institute";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type StudentTab = "batches" | "kits" | "live";

const mockBatches = [
  { title: "Foundation Batch A", schedule: "Mon/Wed/Fri · 6:00PM" },
  { title: "Revision Batch X", schedule: "Tue/Thu · 4:00PM" },
  { title: "Crash Course Select", schedule: "Sat/Sun · 10:00AM" },
];

const learningKits = [
  { name: "Physics Formula Vault", url: "https://example.com/learning-kits/physics.pdf" },
  { name: "Mathematics Quick Revision", url: "https://example.com/learning-kits/math.pdf" },
  { name: "English Grammar Booster", url: "https://example.com/learning-kits/english.pdf" },
];

const mockScores = [
  { label: "Mock 1", score: 78 },
  { label: "Mock 2", score: 84 },
  { label: "Mock 3", score: 92 },
  { label: "Mock 4", score: 88 },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState<StudentTab>("batches");

  useEffect(() => {
    if (!user) return undefined;
    return subscribeStudentSnapshot(user.uid, (d) => setStudent(d ?? {}));
  }, [user]);

  const cards = useMemo(
    () => [
      ["Attendance", `${student.attendancePercent ?? "—"}%`],
      ["Fee status", String(student.feeStatus ?? "Loading")],
      ["Upcoming CBT", String(student.nextExam ?? "No scheduled exam")],
    ] as const,
    [student]
  );

  const averageScore = useMemo(() => Math.round(mockScores.reduce((sum, item) => sum + item.score, 0) / mockScores.length), []);
  const chartData = useMemo(
    () => ({
      labels: mockScores.map((item) => item.label),
      datasets: [
        {
          label: "Score",
          data: mockScores.map((item) => item.score),
          backgroundColor: "#2563eb",
          borderRadius: 8,
          maxBarThickness: 28,
        },
      ],
    }),
    []
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-white shadow-lg">
        <p className="text-blue-100">Good to see you</p>
        <h2 className="mt-1 font-serif text-3xl">{String(student.name ?? user?.displayName ?? "Student")}</h2>
        <p className="mt-4 max-w-xl text-sm text-blue-100">Your coursework, attendance and fees update here in real time.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Mock exam breakdown</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Performance tracker</h3>
            </div>
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-700">Average score {averageScore}%</div>
          </div>
          <div className="mt-6">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
                scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 100 } },
              }}
            />
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Analytical insights</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Mock completion</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{mockScores.length} exams</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Top score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{Math.max(...mockScores.map((item) => item.score))}%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Exam readiness</p>
              <div className="mt-3 w-full rounded-full bg-slate-200">
                <div className="h-3 rounded-full bg-blue-600" style={{ width: `${averageScore}%` }} />
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "batches", label: "My Registered Batches" },
            { key: "kits", label: "Download PDF Learning Kits" },
            { key: "live", label: "Join Live Digital Room" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as StudentTab)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${activeTab === tab.key ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "batches" && (
            <div className="space-y-4">
              {mockBatches.map((batch) => (
                <article key={batch.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">{batch.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{batch.schedule}</p>
                </article>
              ))}
            </div>
          )}

          {activeTab === "kits" && (
            <div className="space-y-4">
              {learningKits.map((kit) => (
                <article key={kit.name} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{kit.name}</p>
                    <p className="mt-1 text-sm text-slate-500">High-impact PDF learning kit</p>
                  </div>
                  <a href={kit.url} target="_blank" rel="noreferrer" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Download PDF</a>
                </article>
              ))}
            </div>
          )}

          {activeTab === "live" && (
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Digital classroom link</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Join today's live session</h3>
              <p className="mt-2 text-sm text-slate-600">Start your collaborative learning room instantly with the institute's secure digital classroom.</p>
              <a href="https://meet.google.com/" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Join Live Room</a>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
