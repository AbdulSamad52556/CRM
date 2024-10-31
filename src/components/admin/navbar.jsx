import React, { useState } from 'react'
import dash from '../../assets/menu.png'
import home from '../../assets/home.png'
import user from '../../assets/user.png'
import setting from '../../assets/setting.png'
import monitor from '../../assets/monitor.png'
import payment from '../../assets/payment.png'
import loading from '../../assets/loading.png'
import barchart from '../../assets/bar-chart.png'
import owner from '../../assets/accountant.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [path, setPath] = useState('')
    const navigate = useNavigate();

    const redirect = (e,rout) =>{
        e.preventDefault()
        navigate(rout)
    }

  return ( 
    <>
    <div className='flex flex-col justify-around bg-[#10002B] h-[95vh] group min-w-14 w-[2%] hover:w-[15%] duration-300 mt-1'>
        <div className='flex flex-col px-4 w-full cursor-pointer' onClick={(e)=>redirect(e,'/admin-dashboard')}>
            <div className='flex gap-5'>
                <img title='Dashboard & Analytics' className='duration-300 cursor-pointer w-5 h-5' src={dash} alt="" />
                <p className='hidden group-hover:block duration-300 text-center text-white'>Dashboard </p>
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5'>
            <img className='duration-300 cursor-pointer w-5 h-5' title='Inventory' src={home} alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Inventory </p>
            
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5' onClick={(e)=>redirect(e,'/owner')}>
            <img className='duration-300 cursor-pointer w-5 h-5' title='Owners' src={owner} alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Owners </p>
            
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5' onClick={(e)=>{redirect(e,'/user-management')}}>
            <img src={user} title='Users' className='h-5 duration-300 w-5 cursor-pointer' alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Users</p>
        
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5'>
            <img src={monitor} className='h-5 duration-300 cursor-pointer w-5' title='Financial Integration' alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Financial</p>
        
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5'>
            <img src={payment} className='h-5 cursor-pointer w-5' title='Workflows & Approvals' alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Workflows</p>
            
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5'>
            <img  src={loading} className='h-5 cursor-pointer w-5' title='Audit Trails' alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Audit</p>
            
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5'>
            <img src={barchart} className='h-5 cursor-pointer w-5' title='Reports & Analytics' alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Analytics</p>
            
            </div>
        </div>
        <div className='flex flex-col px-4 w-full cursor-pointer'>
            <div className='flex gap-5' onClick={(e)=>redirect(e,'/admin-settings')}>
            <img title='System Settings' className='h-5 cursor-pointer w-5' src={setting} alt="" />
            <p className='hidden group-hover:block duration-300 text-white text-center'>Settings</p>
            
            </div>
        </div>
        <div>
            
        </div>

    </div>
    </>
  )
}

export default Navbar
