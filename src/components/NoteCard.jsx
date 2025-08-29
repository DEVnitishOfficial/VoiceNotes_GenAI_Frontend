import { useState } from "react";
import { generateSummary, deleteNote, updateNote } from "../services/Api";

export default function NoteCard({ _id, title, transcript, summary, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editTranscript, setEditTranscript] = useState(transcript);

  const handleDelete = async () => {
    await deleteNote(_id);
    refresh();
  };

  const handleSummary = async () => {
    await generateSummary(_id);
    refresh();
  };

  const handleSave = async () => {
    await updateNote(_id, { title: editTitle, transcript: editTranscript });
    setIsEditing(false);
    refresh();
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl my-3">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <textarea
            value={editTranscript}
            onChange={(e) => setEditTranscript(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            rows="3"
          />
        </>
      ) : (
        <>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-gray-700">{transcript}</p>
          <p className="text-gray-700">{summary}</p>
        </>
      )}

      <div className="flex gap-2 mt-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Delete
            </button>
            <button
              onClick={handleSummary}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Generate Summary
            </button>
          </>
        )}
      </div>
    </div>
  );
}
