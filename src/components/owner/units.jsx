import React, { useEffect, useState } from 'react'
import Header from './header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Units = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get('propertyId');

    const [units, setUnits] = useState([]);
    const [form, setForm] = useState(false)

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/assets/units/');
                setUnits(response.data);
            } catch (error) {
                console.error("Error fetching units:", error);
            }
        };
        fetchUnits();
    }, []);
    
    const [formData, setFormData] = useState({
        property: propertyId, 
        unit_no: '',
        unit_type: '',
        size_sqm: '',
        furnished: false,
        floor_no: '',
        bedrooms: '',
        parking_spaces: '',
        water_connection_no: '',
        electricity_connection_no: '',
        cooling_number: '',
        rental_price: '',
        sales_price: '',
        status: 'available',
        layout_type: null,
    });

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/assets/units/create/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Unit created:', response.data);
            setFormData({
                property: propertyId, 
                unit_no: '',
                unit_type: '',
                size_sqm: '',
                furnished: false,
                floor_no: '',
                bedrooms: '',
                parking_spaces: '',
                water_connection_no: '',
                electricity_connection_no: '',
                cooling_number: '',
                rental_price: '',
                sales_price: '',
                status: 'available',
                layout_type: null,
            })
            setForm(false)
        } catch (error) {
            console.error('Error creating unit:', error);
        }
    };

  return (
    <div>
        <Header/>

        <div className="p-4">
            <div className='flex justify-between'>

            <h2 className="text-2xl font-semibold mb-4">Unit List</h2>
            <div>
                <button className='bg-black p-2 rounded text-white' onClick={()=>{setForm(!form)}}>
                    Add Unit +
                </button>
            </div>
            </div>
            <div className="overflow-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Unit No</th>
                            <th className="py-3 px-6 text-left">Unit Type</th>
                            <th className="py-3 px-6 text-left">Size (sqm)</th>
                            <th className="py-3 px-6 text-left">Furnished</th>
                            <th className="py-3 px-6 text-left">Floor No</th>
                            <th className="py-3 px-6 text-left">Bedrooms</th>
                            <th className="py-3 px-6 text-left">Parking</th>
                            <th className="py-3 px-6 text-left">Rental Price</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Layout Type</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {units.map((unit, index) => (
                            <tr key={unit.id} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="py-3 px-6">{unit.unit_no}</td>
                                <td className="py-3 px-6">{unit.unit_type}</td>
                                <td className="py-3 px-6">{unit.size_sqm}</td>
                                <td className="py-3 px-6">{unit.furnished ? 'Yes' : 'No'}</td>
                                <td className="py-3 px-6">{unit.floor_no}</td>
                                <td className="py-3 px-6">{unit.bedrooms}</td>
                                <td className="py-3 px-6">{unit.parking_spaces}</td>
                                <td className="py-3 px-6">{unit.rental_price ? `$${unit.rental_price}` : 'N/A'}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs ${
                                            unit.status === 'available'
                                                ? 'bg-green-100 text-green-800'
                                                : unit.status === 'reserved'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : unit.status === 'sold'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}
                                    >
                                        {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                                    </span>
                                </td>
                                <td className="py-3 px-6">{unit.layout_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>




    {form &&
      <form onSubmit={handleSubmit} className="fixed inset-0  max-w-2xl mx-auto p-10 bg-white shadow-md rounded-lg space-y-6 h-[100vh] overflow-scroll">
      <div className='flex justify-between'>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create New Unit</h2>
      <div>
        <button onClick={()=>setForm(false)}>X</button>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Unit Number</label>
              <input
                  type="text"
                  name="unit_no"
                  value={formData.unit_no}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Unit Type</label>
              <input
                  type="text"
                  name="unit_type"
                  value={formData.unit_type}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Size (sqm)</label>
              <input
                  type="number"
                  name="size_sqm"
                  value={formData.size_sqm}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-3">Furnished</label>
              <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Floor Number</label>
              <input
                  type="number"
                  name="floor_no"
                  value={formData.floor_no}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Bedrooms</label>
              <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Parking Spaces</label>
              <input
                  type="number"
                  name="parking_spaces"
                  value={formData.parking_spaces}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Water Connection No</label>
              <input
                  type="text"
                  name="water_connection_no"
                  value={formData.water_connection_no}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Electricity Connection No</label>
              <input
                  type="text"
                  name="electricity_connection_no"
                  value={formData.electricity_connection_no}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Cooling Number</label>
              <input
                  type="text"
                  name="cooling_number"
                  value={formData.cooling_number}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Rental Price</label>
              <input
                  type="number"
                  name="rental_price"
                  value={formData.rental_price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Sales Price</label>
              <input
                  type="number"
                  name="sales_price"
                  value={formData.sales_price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Status</label>
              <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
              </select>
          </div>
  
          <div>
              <label className="block text-gray-700 font-medium mb-1">Layout Type</label>
              <input
                  type="file"
                  name="layout_type"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
          </div>
          
      </div>
  
      <button
          type="submit"
          className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
          Create Unit
      </button>
  </form>
      }

    </div>
  )
}

export default Units
