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
  return (
    <div className='w-full bg-[#10002B] h-14'>
        
    </div>
  )
}

export default Header
