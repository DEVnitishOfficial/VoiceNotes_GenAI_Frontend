import { generateSummary, deleteNote } from "../services/Api";

export default function NoteCard({ _id, title, transcript, summary, refresh }) {
  const handleDelete = async () => {
    await deleteNote(_id);
    refresh();
  };

  const handleSummary = async () => {
    await generateSummary(_id);
    refresh();
  };

  return (
    <div className="bg-green-800 shadow p-4 rounded-xl my-3">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-gray-700">{summary || transcript}</p>
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-1 bg-gray-200 rounded">Edit</button>
        <button onClick={handleDelete} className="px-3 py-1 bg-gray-200 rounded">Delete</button>
        <button onClick={handleSummary} className="px-3 py-1 bg-black text-white rounded">Generate Summary</button>
      </div>
    </div>
  );
}
