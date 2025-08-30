// src/pages/NotesPage.jsx
import React, { useState } from "react";
import useNotes from "../hooks/useNotes";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import Recorder from "../components/Recorder";

export default function NotesPage() {
  const { notes, loading, error, uploadAndTranscribe, saveEdit, remove, summarize } =
    useNotes();

  // header / upload states
  const [pickedFile, setPickedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // editor states
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(null);

  // initialize recorder with an onBlobReady callback
  // Recorder (as implemented in repo) returns { start, stop, isRecording }
  // and internally uses onBlobReady to hand back a blob when recording stops.
  const recorder = Recorder({
    onBlobReady: async (blob) => {
      try {
        setUploading(true);
        // ensure filename & mime are set
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        await uploadAndTranscribe(file, title || "Recorded Note");
        setTitle("");
      } catch (err) {
        console.error("Upload from recorder failed:", err);
        alert("Failed to upload recording.");
      } finally {
        setUploading(false);
      }
    },
  });

  // file picker change
  const onPickFile = (e) => {
    setPickedFile(e.target.files?.[0] || null);
  };

  // upload selected file
  const onUpload = async () => {
    if (!pickedFile) return alert("Please pick an audio file first.");
    try {
      setUploading(true);
      await uploadAndTranscribe(pickedFile, title || pickedFile.name);
      setPickedFile(null);
      setTitle("");
    } catch (err) {
      console.error("File upload failed:", err);
      alert("Upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  // open editor modal
  const openEdit = (note) => {
    setCurrent(note);
    setEditing(true);
  };

  // save edits
  const save = async (updates) => {
    try {
      const id = current?._id || current?.id;
      if (!id) {
        alert("Invalid note selected.");
        return;
      }
      await saveEdit(id, updates);
      setEditing(false);
      setCurrent(null);
    } catch (err) {
      console.error("Save edit failed:", err);
      alert("Failed to save changes.");
    }
  };

  // delete handler (passed to NoteCard)
  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await remove(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete note.");
    }
  };

  // summarize handler (passed to NoteCard)
  const handleSummarize = async (id) => {
    try {
      await summarize(id);
    } catch (err) {
      console.error("Summarize failed:", err);
      alert("Failed to generate summary.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header
        onPickFile={onPickFile}
        onUpload={onUpload}
        uploading={uploading}
        onRecordStart={recorder.start}
        onRecordStop={recorder.stop}
        isRecording={recorder.isRecording}
        title={title}
        setTitle={setTitle}
      />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {loading && <div className="text-sm text-neutral-500 mb-3">Loading…</div>}
        {error && <div className="text-sm text-red-600 mb-3">{String(error)}</div>}

        {/* Show picked file info + quick upload */}
        {pickedFile && (
          <div className="mb-4 flex items-center gap-3">
            <div className="text-sm text-neutral-700">{pickedFile.name}</div>
            <button
              onClick={onUpload}
              disabled={uploading}
              className={`px-3 py-1 rounded ${uploading ? "bg-neutral-200 text-neutral-500" : "bg-black text-white"}`}
            >
              {uploading ? "Uploading…" : "Upload & Transcribe"}
            </button>
            <button
              onClick={() => setPickedFile(null)}
              className="px-2 py-1 text-sm rounded bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        )}

        {notes.length === 0 && !loading ? (
          <div className="text-center text-neutral-500 py-16">
            No notes yet. Record or upload audio to get started.
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((n) => (
              <NoteCard
                key={n._id || n.id}
                note={n}
                onEdit={openEdit}
                onDelete={handleDelete}
                onSummarize={handleSummarize}
              />
            ))}
          </div>
        )}
      </main>

      <NoteEditor open={editing} onClose={() => setEditing(false)} onSave={save} note={current} />
    </div>
  );
}
