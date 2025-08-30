export default function Header ({
  onPickFile,
  onUpload,
  uploading,
  onRecordStart,
  onRecordStop,
  isRecording,
  setTitle,
  title
}) {
  return (
    <header className='sticky top-0 z-10 backdrop-blur bg-white/70 border-b'>
      <div className='max-w-3xl mx-auto px-4 py-3 flex items-center gap-3'>
        <div className='text-xl font-bold tracking-tight'>Voice Notes</div>
        <div className='ml-auto flex items-center gap-2'>
          <input
            className='border rounded-lg px-3 py-2 text-sm'
            placeholder='Title (optional)'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label className='px-3 py-2 text-sm bg-neutral-100 rounded-lg cursor-pointer border'>
            Upload Audio
            <input
              type='file'
              accept='audio/*'
              onChange={onPickFile}
              className='hidden'
            />
          </label>
          <button
            onClick={onUpload}
            disabled={uploading}
            className={`px-3 py-2 text-sm rounded-lg ${
              uploading
                ? 'bg-neutral-200 text-neutral-500'
                : 'bg-black text-white'
            }`}
          >
            {uploading ? 'Uploading…' : 'Transcribe'}
          </button>
          {!isRecording ? (
            <button
              onClick={onRecordStart}
              className='px-3 py-2 text-sm rounded-lg bg-green-500 text-white'
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={onRecordStop}
              className='px-3 py-2 text-sm rounded-lg bg-red-500 text-white'
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
