import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="text-3xl font-bold">Voice Notes GenAI</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
