import { useEffect, useState } from 'react'

export default function NoteEditor ({ open, onClose, onSave, note }) {
  const [title, setTitle] = useState('')
  const [transcript, setTranscript] = useState('')
  

  useEffect(() => {
    if (open && note) {
      setTitle(note.title || '')
      setTranscript(note.transcript || '')
    }
  }, [open, note])

  if (!open) return null

  return (
    <div className='fixed inset-0 z-20 flex items-center justify-center bg-black/30'>
      <div className='w-[600px] max-w-[92vw] bg-white rounded-2xl shadow-xl border p-5'>
        <h3 className='text-lg font-semibold mb-3'>Edit Note</h3>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title'
          className='w-full border rounded-lg px-3 py-2 mb-3'
        />
        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          placeholder='Transcript'
          rows={8}
          className='w-full border rounded-lg px-3 py-2'
        />
        <div className='flex justify-end gap-2 mt-4'>
          <button
            onClick={onClose}
            className='px-3 py-2 rounded-lg bg-neutral-100'
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, transcript })}
            className='px-3 py-2 rounded-lg bg-black text-white'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
