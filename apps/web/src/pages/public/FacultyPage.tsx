import Container from "../../components/common/Container";

import Card from "../../components/ui/Card";

const faculty = [
  {
    name: "Pradeep Sir",
    subject: "Mathematics",
    experience: "15+ Years",
    description: "Strong conceptual teaching. Excellent foundation building. Problem solving expert.",
  },
  {
    name: "Akash Mavi Sir",
    subject: "Physics & Science",
    experience: "—",
    description: "Conceptual teaching. Easy explanations. Strong analytical approach.",
  },
];

export default function FacultyPage() {
  return (
    <Container>
      <section className="py-12">
        <h2 className="text-3xl font-bold text-blue-600">Faculty</h2>
        <p className="mt-3 text-slate-600">Dedicated teachers focused on clarity and results.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {faculty.map((t) => (
            <Card key={t.name}>
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-700">{t.subject}</p>
              <p className="mt-2 text-slate-600">Experience: {t.experience}</p>
              <p className="mt-4 text-slate-600">{t.description}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <h3 className="text-xl font-semibold">Junior Classes</h3>
          <p className="mt-2 text-slate-600">
            Dedicated teachers for primary and junior classes.
          </p>
        </Card>
      </section>
    </Container>
  );
}

