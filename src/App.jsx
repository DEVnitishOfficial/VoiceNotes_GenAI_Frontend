
import { Toaster } from "react-hot-toast";
import NotesPage from "./pages/NotesPage";


export default function App() {
return (
<div className="min-h-screen bg-neutral-50 text-neutral-900">
<NotesPage />
<Toaster />
</div>
);
}
