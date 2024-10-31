import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const Createownermodal = ({ isOpen, onClose }) => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerType, setOwnerType] = useState("Individual");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [contractMode, setContractMode] = useState("");
  const [revenueType, setRevenueType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userData = {
      owner_name: ownerName,
      owner_type: ownerType,
      phone_number: contactNumber,
      email: email,
      password: password,
      role: "Owner",
      agreement_type:agreementType,
      contract_mode:contractMode,
      revenue_type:revenueType
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/crm/create-owners/`,
        userData
      );
      console.log(response.data);
      if (response.status === 201) {
      }

      setSuccess("User added successfully!");
      setOwnerName("");
      setOwnerType("Individual");
      setContactNumber("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Failed to add user. Please try again.");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg">
        <p className="text-end cursor-pointer" onClick={onClose}>
          X
        </p>
        <h2 className="text-2xl font-bold mb-4">Create Owner</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex w-full gap-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ownerName"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="fullname"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="phonenumber"
                required
                className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                className="shadow appearance-none border rounded  text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="mb-4 w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ownerType"
              >
                Owner Type
              </label>
              <select
                id="ownerType"
                value={ownerType}
                onChange={(e) => setOwnerType(e.target.value)}
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agreementType"
              >
                Agreement Type
              </label>
              <select
                id="agreementType"
                value={agreementType}
                onChange={(e) => setAgreementType(e.target.value)}
                required
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Agreement Type</option>
                <option value="Brokerage">Brokerage</option>
                <option value="Asset Management">Asset Management</option>
              </select>
            </div>
          </div>
          {agreementType && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contractMode"
              >
                Contract Mode
              </label>
              <select
                id="contractMode"
                value={contractMode}
                onChange={(e) => setContractMode(e.target.value)}
                required
                className="shadow appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Contract Mode</option>
                {agreementType === "Brokerage" && (
                  <>
                    <option value="percentage_of_sales">
                      Percentage of Total Sales
                    </option>
                    <option value="lease_commission">Lease Commission</option>
                    <option value="custom">Custom Arrangement</option>
                  </>
                )}
                {agreementType === "Asset Management" && (
                  <>
                    <option value="property_management">
                      Property Management
                    </option>
                    <option value="sub_lease">Sub-Lease</option>
                  </>
                )}
              </select>
            </div>
          )}

          {agreementType === "Asset Management" &&
            contractMode === "property_management" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="revenueType"
                >
                  Revenue Type
                </label>
                <input
                  type="text"
                  id="revenueType"
                  value={revenueType}
                  onChange={(e) => setRevenueType(e.target.value)}
                  placeholder="Percentage against monthly collection"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}

          {/* Revenue Type for Asset Management & Sub-Lease Mode */}
          {agreementType === "Asset Management" &&
            contractMode === "sub_lease" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="revenueType"
                >
                  Revenue Type
                </label>
                <input
                  type="text"
                  id="revenueType"
                  value={revenueType}
                  onChange={(e) => setRevenueType(e.target.value)}
                  placeholder="Specify Revenue Type (e.g., Monthly Rent Amount)"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs italic">{success}</p>
          )}
          <div className="flex justify-end">
            {/* <button type="button" className='bg-gray-600 py-2 px-4 rounded'
              onClick={onClose}>close</button> */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Owner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Createownermodal;
