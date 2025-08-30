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
              className='px-6 py-3 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-500 ease-in-out transform hover:shadow-xl hover:shadow-green-500/50'
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={onRecordStop}
              className='px-6 py-3 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition duration-500 ease-in-out transform hover:shadow-xl hover:shadow-red-500/50'
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
