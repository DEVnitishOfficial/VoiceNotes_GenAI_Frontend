// src/pages/NotesPage.jsx
import React, { useState } from 'react'
import useNotes from '../hooks/useNotes'
import Header from '../components/Header'
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import Recorder from '../components/Recorder'
import toast, { Toaster } from 'react-hot-toast';

export default function NotesPage () {
  const {
    notes,
    loading,
    error,
    uploadAndTranscribe,
    saveEdit,
    remove,
    summarize
  } = useNotes()

  const [previewUrl, setPreviewUrl] = useState(null)
  const [summarizingNoteId, setSummarizingNoteId] = useState(null);

  // header / upload states
  const [pickedFile, setPickedFile] = useState(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)

  // editor states
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState(null)

  // initialize recorder with an onBlobReady callback
  // Recorder (as implemented in repo) returns { start, stop, isRecording }
  // and internally uses onBlobReady to hand back a blob when recording stops.
  const recorder = Recorder({
    onBlobReady: async (blob, url) => {
      setPreviewUrl(url)
      try {
        setUploading(true)
        // ensure filename & mime are set
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
        await uploadAndTranscribe(file, title || 'Recorded Note')
        setTitle('')
      } catch (err) {
        console.error('Upload from recorder failed:', err)
        alert('Failed to upload recording.')
      } finally {
        setUploading(false)
      }
    }
  })

  console.log('print the recorder object', recorder)

  // file picker change
  const onPickFile = e => {
    setPickedFile(e.target.files?.[0] || null)
  }

  // upload selected file
  const onUpload = async () => {
    if (!pickedFile) return alert('Please pick an audio file first.')
    try {
      setUploading(true)
      await uploadAndTranscribe(pickedFile, title || pickedFile.name)
      setPickedFile(null)
      setTitle('')
    } catch (err) {
      console.error('File upload failed:', err)
      alert('Upload failed. See console for details.')
    } finally {
      setUploading(false)
    }
  }

  // open editor modal
  const openEdit = note => {
    setCurrent(note)
    setEditing(true)
  }

  // save edits
  const save = async updates => {
    try {
      const id = current?._id || current?.id
      if (!id) {
        alert('Invalid note selected.')
        return
      }
      await saveEdit(id, updates)
      setEditing(false)
      setCurrent(null)
    } catch (err) {
      console.error('Save edit failed:', err)
      alert('Failed to save changes.')
    }
  }

  // delete handler (passed to NoteCard)
  const handleDelete = async id => {
    if (!confirm('Delete this note?')) return
    try {
      await remove(id)
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete note.')
    }
  }

  // summarize handler (passed to NoteCard)
  const handleSummarize = async id => {
    try {
      setSummarizingNoteId(id);
      await summarize(id)
    } catch (err) {
      console.error('Summarize failed:', err)
      alert('Failed to generate summary.')
    } finally {
      setSummarizingNoteId(null);
    }
  }

  return (
    <div className='min-h-screen bg-neutral-50 text-neutral-900'>
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

      {previewUrl && (
        <div className='max-w-3xl mx-auto px-4 mt-4'>
          <p className='text-sm text-neutral-600 mb-1'>Your last recording:</p>
          <audio controls src={previewUrl} className='w-full rounded'></audio>
        </div>
      )}

      <main className='max-w-3xl mx-auto px-4 py-6 mt-10'>
        {loading && (
          <div className='text-sm text-neutral-500 mb-3'>
            {toast.success("Loading...")}
            {
              <svg
                aria-hidden='true'
                role='status'
                className='inline w-20 h-20 mr-3 text-gray-200 animate-spin dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='#1C64F2'
                />
              </svg>
            }
          </div>
        )}
        {error && (
          <div className='text-sm text-red-600 mb-3'>{String(error)}</div>
        )}

        {/* Show picked file info + quick upload */}
        {pickedFile && (
          <div className='mb-4 flex items-center gap-3'>
            <div className='text-sm text-neutral-700'>{pickedFile.name}</div>
            <button
              onClick={onUpload}
              disabled={uploading}
              className={`px-3 py-1 rounded ${
                uploading
                  ? 'bg-neutral-200 text-neutral-500'
                  : 'bg-black text-white'
              }`}
            >
              {uploading ? 'Uploading…' : 'Upload & Transcribe'}
            </button>
            <button
              onClick={() => setPickedFile(null)}
              className='px-2 py-1 text-sm rounded bg-neutral-100'
            >
              Cancel
            </button>
          </div>
        )}

        {notes.length === 0 && !loading ? (
          <div className='text-center text-neutral-500 py-16'>
            No notes yet. Record or upload audio to get started.
          </div>
        ) : (
          <div className='grid gap-4'>
            {notes.map(n => (
              <NoteCard
                key={n._id || n.id}
                note={n}
                onEdit={openEdit}
                onDelete={handleDelete}
                onSummarize={handleSummarize}
                isSummarizing={summarizingNoteId === n._id}
              />
            ))}
          </div>
        )}
      </main>

      <NoteEditor
        open={editing}
        onClose={() => setEditing(false)}
        onSave={save}
        note={current}
      />
    </div>
  )
}
