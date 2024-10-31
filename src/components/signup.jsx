// src/components/Signup.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password);
    // Redirect or show success message after signup
  };

  return (
    <div className="bg-[#10002B] min-h-[100vh] flex flex-col justify-center items-center">
      <div className="w-full h-[80%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 max-w-md mx-auto p-10 border rounded-xl shadow-lg h-full border-[#5A189A]"
        >
          <h2 className="text-2xl text-white font-bold mb-4">Sign Up</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                className="block w-full p-3 mb-2 text-gray-300 border rounded-3xl focus:outline-none bg-[#ffffff00] border-[#5A189A]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="block w-full p-3 mb-2 border text-gray-300 rounded-3xl focus:outline-none bg-[#ffffff00] border-[#5A189A]"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 mb-2 border text-gray-300 rounded-3xl focus:outline-none bg-[#ffffff00] border-[#5A189A]"
            />
            <select
              placeholder="Select your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="block w-full p-3 mb-2 border text-gray-300 focus:outline-none bg-[#ffffff00] border-[#5A189A] rounded-3xl"
            >
                <option className="bg-[#10002B]" value="" disabled selected>Select your role</option>
                {/* <option className="bg-[#10002B]" value="user">Sales Agent</option> */}
                <option className="bg-[#10002B]" value="editor">Lead Generation Specialist (Call Center Agent)</option>
                {/* <option className="bg-[#10002B]" value="editor">Property Manager</option> */}
                {/* <option className="bg-[#10002B]" value="editor">Facility Manager</option> */}
                {/* <option className="bg-[#10002B]" value="editor">Legal Team Member</option> */}
                {/* <option className="bg-[#10002B]" value="editor">Finance Team Member</option> */}
                {/* <option className="bg-[#10002B]" value="editor">Managers (Sales Manager, Property Manager)</option> */}
                <option className="bg-[#10002B]" value="editor">Tenant (Limited Self-Service Access)</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 mb-2 border text-gray-300 focus:outline-none bg-[#ffffff00] border-[#5A189A] rounded-3xl"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              className="block w-full p-3 mb-2 border text-gray-300 focus:outline-none bg-[#ffffff00] border-[#5A189A] rounded-3xl"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5A189A] hover:bg-[#3C096C] text-gray-300 duration-200 p-2 rounded-3xl"
          >
            Sign Up
          </button>
          <p className='text-gray-300 text-center'>Already have an account <a href="/login" className='text-[#5A189A]'>login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
