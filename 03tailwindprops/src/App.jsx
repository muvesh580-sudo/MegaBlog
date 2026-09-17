import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-center bg-green-400 text-black p-4 rounded-xl'>
    Tailwind Test</h1>
    <Card userName="Uvesh"/>
    <Card userName="Aman"/>
    </>
  )
}

export default App
