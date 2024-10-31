import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const CreateUserModal = ({ isOpen, onClose, onSubmit }) => {
  const { createuser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username:'',
    email: '',
    phone_number:'',
    password:'',
    role: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    onSubmit(formData);
    const user = await createuser(formData)
    console.log(user)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create New User</h2>
        
        <form onSubmit={handleSubmit}>
          <div className='flex justify-around'>

          <div className="mb-4">
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder='firstname'
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="px-3 py-2 border text-sm rounded-lg focus:outline-none"
              placeholder='lastname'
              required
            />
          </div>
          </div>
          <div className='flex justify-around'>
          <div className="mb-4">

            <label className="block text-sm mb-1">UserName</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder='username'
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder='email'
              required
            />
          </div>
          
          </div>

          <div className='flex justify-around'>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder='phonenumber'
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder='password'
              required
            />
          </div>
          </div>

          <div className='flex justify-around '>
          <div className="mb-4">
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Agent">Agent</option>
              <option value="Legal Team">Legal Team</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Profile</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="text-sm px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="profile description"
              maxLength={200}
              required
            />
          </div>
          
          
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-lg "
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
