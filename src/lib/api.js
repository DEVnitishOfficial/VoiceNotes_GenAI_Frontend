import axios from "axios";


const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
});


// helpers
const data = (res) => res.data;


export const getNotes = () => API.get("/notes").then(data);


export const transcribeAudio = async (file, title) => {
const form = new FormData();
form.append("audio", file);
if (title) form.append("title", title);
console.log("see form data >>>>>", ...form);
return API.post("/notes/transcribe", form).then(data);
};


export const updateNote = (id, updates) => API.put(`/notes/${id}`, updates).then(data);


export const deleteNote = (id) => API.delete(`/notes/${id}`).then(data);


export const generateSummary = (id) => API.post(`/notes/summary/${id}`).then(data);