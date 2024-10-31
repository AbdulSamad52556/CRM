import React,{useState} from 'react'
import Header from './header'
import Navbar from './navbar'
import Agents from './agents'
import Leads from './leads'
import CreateUserModal from './modals/createusermodal'
import Legal from './legal'

const Usermanagement = () => {
    const [table, setTable] = useState('agents');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const returnoption = () =>{
        if (table === 'agents'){
            return <Agents/>
        }else if ( table === 'leads'){
            return <Leads/>
        }else if ( table === 'legal'){
            return <Legal/>
        }
    }
    const handleCreateUser = (formData) => {
        console.log('New User Data:', formData);
      };
  return (
    <div className='h-[100vh] overflow-hidden'>
        <Header/>
        <div className='flex '>

            <Navbar/>
            <div className='w-[100vw] h-[10vh]'>

                <div className=' border-2 shadow-xl m-1 flex font-bold font-sans justify-around items-center p-2'>
                    <div className={`hover:opacity-100 cursor-pointer duration-300 text-sm ${table === 'agents' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('agents')}>Agents</div>
                    <div className={`hover:opacity-100 cursor-pointer duration-300 text-sm ${table === 'leads' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('leads')}>Lead</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'property manager' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('property manager')}>Property Managers</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'facility manager' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('facility manager')}>Facility Managers</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'legal' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('legal')}>Legal</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'finance' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('finance')}>Finance</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'manager' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('manager')}>Managers</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'tenants' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('tenants')}>Tenants</div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'property manager' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('property manager')}></div>
                    <div className={`hover:opacity-100 cursor-pointer text-sm duration-300 ${table === 'property manager' ? "opacity-100" : 'opacity-50'} `} onClick={()=>setTable('property manager')}></div>
                    <div className='cursor-pointer duration-300'>
                        <button className='bg-[#5A189A] hover:bg-[#3C096C] duration-300 p-4 text-white rounded-2xl' onClick={openModal}>
                            Create user
                        </button>
                    </div>
                </div>

                <div className='p-4'>
                    {returnoption()}
                </div>
            </div>
            <CreateUserModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreateUser} />
        </div>
    </div>
  )
}

export default Usermanagement
