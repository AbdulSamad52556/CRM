import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const Header = () => {

    const [ownerid, setOwnerid] = useState(0)

    useEffect(()=>{
        const user = localStorage.getItem('ownerid')
        const fetchOwner = async() =>{
            const response = await axios.post(`${BASE_URL}`)
        }
        console.log(user)
        setOwnerid(user)

    },[])

    const logout = () =>{
      localStorage.clear()
      window.location.reload()
    }
  return (
    <div className='w-full bg-[#10002B] h-14 flex justify-end p-1'>
      <div className='p-1 '>

      <button className='px-4 py-2 bg-blue-500 rounded' onClick={logout}>
        Logout
      </button>
      </div>
        
    </div>
  )
}

export default Header
