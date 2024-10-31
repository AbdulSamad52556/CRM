import React, { useEffect } from 'react'
import Navbar from './navbar'
import Header from './header'

const Dashboard = () => {

  return (
    <div className='h-[100vh] overflow-hidden'>
        <Header/>
        <div className='flex '>

        <Navbar/>
      
     
        </div>
    </div>
  )
}

export default Dashboard
