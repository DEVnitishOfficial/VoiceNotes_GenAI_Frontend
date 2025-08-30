import { useRef, useState } from 'react'

export default function Recorder ({ onBlobReady }) {
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const [isRecording, setIsRecording] = useState(false)

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const rec = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mediaRecorderRef.current = rec

    rec.ondataavailable = e => {
      if (e.data?.size > 0) chunksRef.current.push(e.data)
    }
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      chunksRef.current = []
      onBlobReady?.(blob)
    }

    rec.start()
    setIsRecording(true)
  }

  const stop = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  return { start, stop, isRecording }
}
