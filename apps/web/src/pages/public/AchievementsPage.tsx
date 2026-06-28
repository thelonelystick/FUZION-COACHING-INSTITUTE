import Container from "../../components/common/Container";
import Card from "../../components/ui/Card";

export default function AchievementsPage() {
  return (
    <Container>
      <section className="py-12">
        <h2 className="text-3xl font-bold text-blue-600">Achievements</h2>
        <p className="mt-3 text-slate-600">
          Awards and success stories will load dynamically from Firebase in a later step.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Student Success", desc: "Recognitions and milestones." },
            { title: "Certificates", desc: "Merit certificates and achievements." },
            { title: "Awards", desc: "Annual excellence programs." },
          ].map((a) => (
            <Card key={a.title}>
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-slate-600">{a.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

