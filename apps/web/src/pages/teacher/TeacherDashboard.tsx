import { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../contexts/AuthContext";
import { broadcastLiveStream, createTeacherResource } from "../../services/institute";
import { storage } from "../../firebase/storage";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteCourse, setNoteCourse] = useState("");
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCourse, setVideoCourse] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [streamTitle, setStreamTitle] = useState("");
  const [streamCourse, setStreamCourse] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>();

  async function uploadNote() {
    if (!user || !noteTitle || !noteCourse || !noteFile) {
      setMessage("Enter a title, course and PDF file to upload.");
      return;
    }

    const path = `materials/${noteCourse}/${crypto.randomUUID()}-${noteFile.name}`;
    const task = uploadBytesResumable(ref(storage, path), noteFile, {
      contentType: noteFile.type,
      customMetadata: { uploadedBy: user.uid },
    });

    task.on(
      "state_changed",
      (snapshot) => setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
      () => setMessage("Upload failed. Please try again."),
      async () => {
        await createTeacherResource({
          title: noteTitle,
          courseId: noteCourse,
          teacherId: user.uid,
          type: noteFile.type === "application/pdf" ? "pdf" : "worksheet",
          storagePath: path,
        });
        setMessage("PDF notes uploaded and queued for review.");
        setUploadProgress(undefined);
        setNoteTitle("");
        setNoteFile(null);
      }
    );
  }

  async function submitVideo() {
    if (!user || !videoTitle || !videoCourse || !videoUrl) {
      setMessage("Provide a video title, course and URL.");
      return;
    }

    await createTeacherResource({
      title: videoTitle,
      courseId: videoCourse,
      teacherId: user.uid,
      type: "video",
      storagePath: videoUrl,
    });
    setMessage("Video URL saved for student access.");
    setVideoTitle("");
    setVideoCourse("");
    setVideoUrl("");
  }

  async function submitStream() {
    if (!user || !streamTitle || !streamCourse || !streamUrl) {
      setMessage("Provide a stream title, course and room URL.");
      return;
    }

    await broadcastLiveStream({
      teacherId: user.uid,
      title: streamTitle,
      courseId: streamCourse,
      streamUrl,
      description: "Live stream scheduled by teacher.",
    });
    setMessage("Live stream broadcast has been recorded.");
    setStreamTitle("");
    setStreamCourse("");
    setStreamUrl("");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[.2em] text-slate-200">Teacher command centre</p>
        <h1 className="mt-3 text-3xl font-semibold">Empower your students with smart content</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-200">Upload notes, embed videos and broadcast live sessions from one teacher workspace.</p>
      </section>

      {message && <div className="rounded-3xl bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">{message}</div>}

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Upload PDF Notes</p>
          <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Note title" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <input value={noteCourse} onChange={(e) => setNoteCourse(e.target.value)} placeholder="Course ID" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <label className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span>{noteFile ? noteFile.name : "Select a PDF or worksheet file"}</span>
            <input type="file" accept="application/pdf,.doc,.docx" className="hidden" onChange={(e) => setNoteFile(e.target.files?.[0] ?? null)} />
          </label>
          <button type="button" onClick={uploadNote} className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Upload notes</button>
          {uploadProgress !== undefined && <p className="mt-3 text-sm text-blue-600">Uploading {uploadProgress}%</p>}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Embed Video URLs</p>
          <input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="Video title" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <input value={videoCourse} onChange={(e) => setVideoCourse(e.target.value)} placeholder="Course ID" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <button type="button" onClick={submitVideo} className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Save video URL</button>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Broadcast Live Streams</p>
          <input value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} placeholder="Stream title" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <input value={streamCourse} onChange={(e) => setStreamCourse(e.target.value)} placeholder="Course ID" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <input value={streamUrl} onChange={(e) => setStreamUrl(e.target.value)} placeholder="Live room URL" className="mt-4 w-full rounded-2xl border border-slate-200 p-3" />
          <button type="button" onClick={submitStream} className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Broadcast now</button>
        </article>
      </section>
    </div>
  );
}
