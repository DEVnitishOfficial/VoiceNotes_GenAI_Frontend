import { useState } from 'react'

export default function NoteCard ({ note, onEdit, onDelete, onSummarize }) {
  const { _id, id, title, transcript, summary } = note
  const noteId = _id || id
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='bg-white rounded-2xl shadow-sm border p-4'>
      <div className='flex items-start gap-2'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-lg leading-tight'>
              {title || 'Untitled'}
            </h3>
            {summary ? (
              <span className='text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200'>
                Summarized
              </span>
            ) : null}
          </div>
          <p
            className={`mt-2 text-sm text-neutral-700 ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {summary || transcript}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 mt-3'>
        <button
          onClick={() => setExpanded(v => !v)}
          className='text-xs px-2 py-1 rounded bg-neutral-100'
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
        <button
          onClick={() => onEdit(note)}
          className='text-xs px-2 py-1 rounded bg-neutral-100'
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(noteId)}
          className='text-xs px-2 py-1 rounded bg-neutral-100'
        >
          Delete
        </button>
        <button
          onClick={() => onSummarize(noteId)}
          disabled={!!summary}
          className={`text-xs px-2 py-1 rounded ${
            summary
              ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              : 'bg-black text-white'
          }`}
        >
          Generate Summary
        </button>
      </div>
    </div>
  )
}
