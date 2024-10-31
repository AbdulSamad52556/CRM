import React from 'react'
import Header from './header'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.clear()
        window.location.reload()
    }

  return (
    <div className='h-[100vh] overflow-hidden'>
        <Header/>
        <div className='flex '>

        <Navbar/>
      
        <p className='text-end w-full p-10 cursor-pointer' onClick={logout}>logout</p>
        </div>
    </div>
  )
}

export default Settings
