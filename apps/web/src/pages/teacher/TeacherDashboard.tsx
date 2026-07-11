import { useState } from "react";
import { CalendarClock, FileText, PlayCircle, Video } from "lucide-react";
import Card from "../../components/ui/Card";
import { useDashboardStats } from "../../lib/firestoreHooks";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db } from "../../firebase/firestore";
import { storage } from "../../firebase/storage";

export default function TeacherDashboard() {
  const { items, loading, error } = useDashboardStats("teachers");
  const [noteForm, setNoteForm] = useState({ title: "", description: "" });
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [classForm, setClassForm] = useState({ title: "", timing: "", link: "" });
  const [videoForm, setVideoForm] = useState({ title: "", url: "" });
  const [message, setMessage] = useState<string | null>(null);

  const submitNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!noteFile) {
      setMessage("Please attach a PDF or document file before uploading.");
      return;
    }
    const fileRef = ref(storage, `pdf-notes/${Date.now()}-${noteFile.name}`);
    await uploadBytes(fileRef, noteFile);
    const fileUrl = await getDownloadURL(fileRef);
    await addDoc(collection(db, "studyNotes"), {
      title: noteForm.title,
      description: noteForm.description,
      fileName: noteFile.name,
      fileUrl,
      createdAt: serverTimestamp(),
    });
    setMessage("Study note uploaded successfully.");
    setNoteForm({ title: "", description: "" });
    setNoteFile(null);
  };

  const submitClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addDoc(collection(db, "liveClasses"), { ...classForm, createdAt: serverTimestamp() });
    setMessage("Live class scheduled successfully.");
    setClassForm({ title: "", timing: "", link: "" });
  };

  const submitVideo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addDoc(collection(db, "recordedVideos"), { ...videoForm, createdAt: serverTimestamp() });
    setMessage("Recorded video link saved successfully.");
    setVideoForm({ title: "", url: "" });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-7 text-white shadow-[0_25px_90px_-25px_rgba(15,23,42,0.65)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Teacher workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Today’s classes</h1>
            <p className="mt-2 text-slate-300">5 classes planned • 3 pending revisions • 2 new doubts</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">Studio mode</div>
        </div>
      </Card>
      {message ? <Card className="border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-700"><p className="text-sm font-medium">{message}</p></Card> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><FileText size={16} /><h2 className="text-lg font-semibold text-slate-900">Pending reviews</h2></div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• 12 Physics homework submissions</li>
            <li className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• 7 Mathematics worksheets</li>
          </ul>
        </Card>
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><CalendarClock size={16} /><h2 className="text-lg font-semibold text-slate-900">Collected records</h2></div>
          {loading ? <p className="mt-3 text-sm text-slate-600">Loading teacher records...</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {items.slice(0, 3).map((item) => (
              <li key={String(item.id)} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">• {String(item.name ?? item.email ?? item.id)}</li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><FileText size={16} /><h2 className="text-lg font-semibold text-slate-900">Upload PDF Notes</h2></div>
          <form className="mt-3 space-y-3" onSubmit={submitNote}>
            <input value={noteForm.title} onChange={(event) => setNoteForm({ ...noteForm, title: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Title" />
            <input value={noteForm.description} onChange={(event) => setNoteForm({ ...noteForm, description: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Description" />
            <input type="file" accept=".pdf,.doc,.docx" onChange={(event) => setNoteFile(event.target.files?.[0] ?? null)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" />
            <button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">Upload note</button>
          </form>
        </Card>
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><Video size={16} /><h2 className="text-lg font-semibold text-slate-900">Add Video Link</h2></div>
          <form className="mt-3 space-y-3" onSubmit={submitVideo}>
            <input value={videoForm.title} onChange={(event) => setVideoForm({ ...videoForm, title: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Video title" />
            <input value={videoForm.url} onChange={(event) => setVideoForm({ ...videoForm, url: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Embedded URL" />
            <button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">Save link</button>
          </form>
        </Card>
        <Card className="border border-slate-200/70 bg-white/85 p-6">
          <div className="flex items-center gap-2 text-cyan-700"><PlayCircle size={16} /><h2 className="text-lg font-semibold text-slate-900">Schedule Live Class</h2></div>
          <form className="mt-3 space-y-3" onSubmit={submitClass}>
            <input value={classForm.title} onChange={(event) => setClassForm({ ...classForm, title: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Class title" />
            <input value={classForm.timing} onChange={(event) => setClassForm({ ...classForm, timing: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Timing" />
            <input value={classForm.link} onChange={(event) => setClassForm({ ...classForm, link: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 outline-none transition-all duration-300 focus:border-cyan-500" placeholder="Meeting link" />
            <button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-3 font-semibold text-white transition-all duration-300 transform hover:-translate-y-0.5" type="submit">Schedule class</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
