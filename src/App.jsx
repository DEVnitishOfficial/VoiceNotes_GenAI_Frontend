import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import { getNotes, transcribeAudio } from "./services/Api";
import AudioRecorder from "./components/AudioRecorder";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data.data);
  };


  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpload = async () => {
    if (!file || !title) return alert("Please select file and add title");
    await transcribeAudio(file, title);
    setFile(null);
    setTitle("");
    fetchNotes();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Voice Notes</h1>

      <AudioRecorder onRecordingComplete={(blob) => setFile(blob)} />
      {/* <NotesPage /> */}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Upload & Transcribe
        </button>
      </div>

      {notes.map((note) => (
        <NoteCard key={note._id} {...note} refresh={fetchNotes} />
      ))}
    </div>
  );
}
