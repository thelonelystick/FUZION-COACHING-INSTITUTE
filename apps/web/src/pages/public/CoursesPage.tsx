import Container from "../../components/common/Container";

import Card from "../../components/ui/Card";

const courseGroups = [
  {
    title: "PRIMARY",
    classes: [1, 2, 3, 4, 5],
    subjects: [
      "Mathematics",
      "English",
      "Hindi",
      "EVS",
      "School Homework Support",
    ],
  },
  {
    title: "MIDDLE SCHOOL",
    classes: [6, 7, 8],
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
  },
  {
    title: "SECONDARY",
    classes: [9, 10],
    subjects: ["Mathematics", "Science"],
  },
  {
    title: "SENIOR SECONDARY",
    classes: [11, 12],
    subjects: ["Mathematics", "Physics", "Chemistry"],
  },
];

export default function CoursesPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-600">Courses</h2>
            <p className="mt-3 text-slate-600">Structured learning paths across grades.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {courseGroups.map((g) => (
            <Card key={g.title}>
              <h3 className="text-xl font-semibold">{g.title}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Classes: {g.classes.join(", ")}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700">Subjects</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                  {g.subjects.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <h3 className="text-xl font-semibold">ADDITIONAL PROGRAMS</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {["Olympiad Preparation", "Spoken English", "Computer Basics"].map((p) => (
              <div key={p} className="rounded-xl bg-slate-50 p-4 text-slate-700">
                {p}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </Container>
  );
}

