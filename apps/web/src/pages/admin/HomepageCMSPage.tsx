import Card from "../../components/ui/Card";

export default function HomepageCMSPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Homepage CMS</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Homepage Content Management</h1>
        <p className="mt-2 text-slate-600">Edit hero banners, features, testimonials and public-facing content.</p>
      </Card>
    </div>
  );
}
