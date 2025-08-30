import { useEffect, useState, useCallback } from "react";
import {
  getNotes,
  transcribeAudio,
  updateNote,
  deleteNote,
  generateSummary,
} from "../lib/api";

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      // backend may return array or {data: []}; normalize
      const list = Array.isArray(res) ? res : res?.data || [];
      setNotes(list);
      setError(null);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadAndTranscribe = async (file, title) => {
    setLoading(true);
    try {
      await transcribeAudio(file, title || "New Voice Note");
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async (id, updates) => {
    setLoading(true);
    try {
      await updateNote(id, updates);
      await load(); // backend clears summary if transcript changed
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteNote(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const summarize = async (id) => {
    setLoading(true);
    try {
      await generateSummary(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    notes,
    loading,
    error,
    load,
    uploadAndTranscribe,
    saveEdit,
    remove,
    summarize,
  };
}
