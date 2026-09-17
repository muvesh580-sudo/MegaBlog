import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'



function App() {

  let [counter,chaiCounter] =useState(15)

  //let counter =15
  const addValue = ()=>{
    if(counter===20)
      return;
    counter++;
    chaiCounter(counter)
    
  }

  const subValue=()=>{
    if(counter===0)
      return;
    counter--;
    chaiCounter(counter);
  }


  return (
   <>
   <h1>Chai aur react</h1>
   <h2>Counter value: {counter} </h2>

   <button
   onClick={addValue}
   >Add value{counter}</button>
   <br/>
  <button
  onClick={subValue}
  >remove value {counter}</button>
  <p>Footer: {counter}</p>
   </>
  )
}

export default App
