
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
});

// Upload audio + transcribe
export const transcribeAudio = async (file, title) => {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("title", title);
  const res = await API.post("/notes/transcribe", formData);
  return res.data;
};

// create note
export const createNote = async (data) => {
  const res = await API.post("/notes", data);
  return res.data;
};

// Get all notes
export const getNotes = async () => {
  const res = await API.get("/notes");
  console.log('api url see>>>', API.get("/notes"));
  console.log('res',res);
  return res.data;
};

// Generate summary
export const generateSummary = async (id) => {
  const res = await API.post(`/notes/summary/${id}`);
  return res.data;
};

// Delete note
export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

// Update note
export const updateNote = async (id, data) => {
  const res = await API.put(`/notes/${id}`, data);
  return res.data;
};
