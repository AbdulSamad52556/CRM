import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/assets/all-properties/');
                console.log(response.data)
                setProperties(response.data);
            } catch (err) {
                console.log(err)
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

  return (
    <div className='bg-gray-200 w-full h-[100vh] p-10'>
      <div className='bg-white w-full h-full rounded-xl'>
        <div className='flex justify-between'>

        <div className='p-10'>
            <p className='font-bold'>Properties</p>
        </div>
        <div className='p-10'>
            <button className='p-2 rounded bg-black text-white'>
                Add Customer
            </button>
        </div>
        </div>
        <div className="container mx-auto px-10">
            <h1 className="text-2xl font-bold mb-4">Properties Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                Property
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                Property type
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                units
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                Leads
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                mode
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                Status
                            </th>
                            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.property_name}</td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.property_type}</td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.available_units}</td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">0</td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.mode}</td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200 text-sm">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        View
                                    </button>
                                    <button className="ml-2 text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
