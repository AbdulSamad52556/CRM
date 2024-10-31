import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const Legal = () => {
    const [legals, setLegal] = useState([]);

    useEffect(()=>{
        const agents = async () =>{
          const response = await axios.get(
              `${BASE_URL}/api/users/legal-view/`
          )
          console.log(response.data)
          setLegal(response.data)
      }
      agents()
    
      },[])
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Contact</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Operation</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
            {legals.map((legal, index) => {
                return (
                <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                    {legal.first_name} {legal.last_name}
                    </td>
                    <td className="py-3 px-6 text-left">{legal.phone_number}</td>
                    <td className="py-3 px-6 text-left">{legal.email}</td>
                    <td className="py-3 px-6 text-left">
                    <span className="text-green-500 font-semibold">
                        {legal.is_active ? "Active" : "Inactive"}
                    </span>
                    </td>
                    <td className="py-3 px-6 text-left">{legal.is_active ? "active" : "inactive"}</td>
                    <td className="py-3 px-6 text-left">
                    <button className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600">
                        view
                    </button>
                    </td>
                </tr>
                );
            })}
            </tbody>

      </table>
    </div>
  )
}

export default Legal
