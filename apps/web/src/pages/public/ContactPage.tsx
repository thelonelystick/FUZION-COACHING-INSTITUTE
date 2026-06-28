import Container from "../../components/common/Container";

import Card from "../../components/ui/Card";

export default function ContactPage() {
  return (
    <Container>
      <section className="py-12">
        <h2 className="text-3xl font-bold text-blue-600">Contact</h2>
        <p className="mt-3 text-slate-600">Reach out to FUZION COACHING INSTITUTE.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-xl font-semibold">FUZION COACHING INSTITUTE</h3>
            <p className="mt-2 text-slate-600">Bharat City</p>
            <div className="mt-6 space-y-2 text-slate-600">
              <p>
                Phone: <span className="font-medium">(from Firebase settings)</span>
              </p>
              <p>
                WhatsApp: <span className="font-medium">(from Firebase settings)</span>
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold">Google Maps</h3>
            <div className="mt-4 aspect-video w-full rounded-xl bg-slate-50">
              <p className="flex h-full items-center justify-center text-slate-500">
                Map embed will be configured with a Firebase setting.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
}

