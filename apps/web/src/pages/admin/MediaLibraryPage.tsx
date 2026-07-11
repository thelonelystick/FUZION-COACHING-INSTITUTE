import Card from "../../components/ui/Card";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Admin • Media</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Media Library</h1>
        <p className="mt-2 text-slate-600">Upload and manage images, videos and downloadable resources used across the site.</p>
      </Card>
    </div>
  );
}
