import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import authService from "./appwrite/auth";
import { Login, Logout } from "./store/authSlice";


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()  

  useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData) {
        dispatch(Login({userData}))
      } else{
        dispatch(Logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap 
    content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
