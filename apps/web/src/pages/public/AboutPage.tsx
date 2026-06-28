import Container from "../../components/common/Container";

import Card from "../../components/ui/Card";

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <Card>
            <h2 className="text-3xl font-bold text-blue-600">About</h2>
            <p className="mt-4 text-slate-600">
              FUZION COACHING INSTITUTE is built for students who want clear
              concepts, confident problem-solving, and consistent results.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Mission</h3>
            <p className="mt-2 text-slate-600">
              Make learning simple, structured, and result-oriented.
            </p>
            <h3 className="mt-6 text-xl font-semibold">Vision</h3>
            <p className="mt-2 text-slate-600">
              Empower every student with strong foundations and exam-ready skills.
            </p>
          </Card>
        </div>

        <Card className="mt-6">
          <h3 className="text-xl font-semibold">Teaching Philosophy</h3>
          <p className="mt-2 text-slate-600">
            Concept first. Practice often. Doubts resolved quickly. Weekly progress
            tracked through structured tests.
          </p>
        </Card>
      </section>
    </Container>
  );
}

