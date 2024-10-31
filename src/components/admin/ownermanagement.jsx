import React, { useEffect, useState } from "react";
import Header from "./header";
import Navbar from "./navbar";
import Createownermodal from "./modals/createownermodal";
import axios from "axios";

const BASE_URL = 'http://localhost:8000'

const Ownermanagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owners, setOwners] = useState([]);

  useEffect(()=>{
    const fetchowners = async () =>{
        const response = await axios.get(`${BASE_URL}/api/crm/get-owners/`)
        console.log(response.data)
        setOwners(response.data)
    }
    fetchowners();
  },[])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="h-[100vh] overflow-hidden">
      <Header />
      <div className="flex ">
        <Navbar />
        <div className="w-full  flex h-12 justify-between mt-1">
          <div className="flex flex-col w-[80%] mt-1 px-10">
            <h1 className="font-bold text-xl py-10">Owners List</h1>
            <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Contact</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  {/* <th className="py-3 px-6 text-left">Status</th> */}
                  <th className="py-3 px-6 text-left">Verification</th>
                  <th className="py-3 px-6 text-left">Agreement Type</th>
                  <th className="py-3 px-6 text-left">Contract Mode</th>
                  <th className="py-3 px-6 text-left">Revenue Type</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {owners.map((owner, index) => {
                  return (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={index}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {owner.owner_name}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {owner.phone_number}
                      </td>
                      <td className="py-3 px-6 text-left">{owner.email}</td>
                      {/* <td className="py-3 px-6 text-left">
                        <span className="text-red-500 font-semibold">
                          {owner.is_active ? "Active" : "Inactive"}
                        </span>
                      </td> */}
                      <td className={`py-3 px-6 text-left ${owner.is_verified_from_legal_team === true? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}`}>
                        {owner.is_verified_from_legal_team === true ? "verified" : "pending"}
                      </td>
                      <td>
                        {owner.asset_management?'Asset management':null}
                        {owner.brokerage?'Brokerage Owner':null}
                      </td>
                      <td>
                        {owner.asset_management?owner.asset_management.contract_mode:null}
                        {owner.brokerage?owner.brokerage.contract_mode:null}
                      </td>
                      <td>
                        {owner.asset_management?owner.asset_management.revenue_type:null}
                      </td>
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
          <div className="m-1 mr-3">
            <button
              className="bg-[#10002B] hover:bg-[#141447] duration-300 px-4 py-2 rounded-3xl text-white"
              onClick={openModal}
            >
              create owner +
            </button>
          </div>
        </div>
        <Createownermodal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default Ownermanagement;
