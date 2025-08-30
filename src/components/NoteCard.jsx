export default function NoteCard ({ note, onEdit, onDelete, onSummarize }) {
  const { _id, id, title, transcript, summary } = note
  const noteId = _id || id

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
          <p className={'mt-2 text-sm text-neutral-700'}>
            <span className='font-semibold'>Transcript:</span> {transcript}
          </p>
          {summary && (
            <p className={'mt-2 text-sm text-neutral-700'}>
              {<span className='font-semibold'>Summary:</span>} {summary}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2 mt-3'>
        <button
          onClick={() => onEdit(note)}
          className='text-xs px-3 py-1.5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out'
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(noteId)}
          className='text-xs px-3 py-1.5 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out ml-2'
        >
          Delete
        </button>
        <button
          onClick={() => onSummarize(noteId)}
          disabled={!!summary}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            summary
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'
          }`}
        >
          Generate Summary
        </button>
      </div>
    </div>
  )
}
