import React, { useState } from 'react'
import Header from './header'
import Properties from './properties'
import Documents from './documents'

const BASE_URL = 'http://localhost:8000'

const Ownersdashboard = () => {
    const [table, setTable] = useState('properties')
    const returnoption = () =>{
        if (table === 'properties'){
            return <Properties/>
        }else if ( table === 'documents'){
            return <Documents/>
        }
    }
  return (
    <div>
      <Header/>
      <div className='w-full flex justify-around items-center font-bold bg-gray-200 h-20 mt-1'>
        <div className='cursor-pointer' onClick={()=>setTable('properties')}>
            <p className={`${table==='properties'? 'text-black': 'text-gray-500'}`}>
                My Properties
            </p>
        </div>
        <div className='cursor-pointer' onClick={()=>setTable('documents')}>
            <p className={`${table==='documents'? 'text-black': 'text-gray-500'}`}>
                My Agreement
            </p>
        </div>
      </div>
      <div className='p-4'>
            {returnoption()}
        </div>
    </div>
  )
}

export default Ownersdashboard
