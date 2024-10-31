import axios from "axios";
import React, { useState } from "react";

const BASE_URL = 'http://localhost:8000'

const Properties = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [modal, setModal] = useState(false);

  const [propertyname, setPropertyName] = useState("");
  const [propertytype, setPropertyType] = useState("");
  const [availableunits, setAvailableUnits] = useState("");
  const [areaname, setAreaname] = useState("");
  const [location, setLocation] = useState("");
  const [zonenumber, setZoneNumber] = useState("");
  const [streetnumber, setStreetNumber] = useState("");
  const [buildingnumber, setBuildingNumber] = useState("");
  const [contracttype, setContractType] = useState("");

  const [imageFields, setImageFields] = useState([
    { id: Date.now(), file: null },
  ]);
  const [paymentfile, setPaymentfile] = useState(null)

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    setImageFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, file: file } : field
      )
    );
  };
  const addImageField = () => {
    setImageFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), file: null },
    ]);
  };
  const removeImageField = (id) => {
    setImageFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };
  const handlePaymentFileChange = (event) => {
    setPaymentfile(event.target.files[0]);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const formData = new FormData();

    formData.append("mode", selectedOption);
    formData.append("property_name", propertyname);
    formData.append("property_type", propertytype);
    formData.append("available_units", parseInt(availableunits));
    formData.append("area_name", areaname);
    formData.append("google_maps_link", location);
    formData.append("zone_number", zonenumber);
    formData.append("street_number", streetnumber);
    formData.append("building_number", buildingnumber);
    formData.append("contract_type", contracttype);

    if (paymentfile) {
        formData.append("payment_file", paymentfile);
      }

    imageFields.forEach((field, index) => {
    if (field.file) {
        formData.append(`property_images`, field.file);
    }
    });
    console.log(formData)
    const response = await axios.post(`${BASE_URL}/api/assets/properties/`,formData)
    console.log(response.status)
    if (response.status === 201){
        setSelectedOption('')
        setPropertyName('')
        setPropertyType('')
        setAvailableUnits('')
        setAreaname('')
        setLocation('')
        setZoneNumber('')
        setStreetNumber('')
        setBuildingNumber('')
        setContractType('')
        setPaymentfile(null)
        setImageFields({ id: Date.now(), file: null })
    }
    
  }

  return (
    <div className="flex flex-col items-end">
      <div className="w-1/4 flex flex-col p-4 items-end">
        <button
          className="bg-[#10002B] px-4 py-2 rounded text-white"
          onClick={() => setModal(true)}
        >
          Add Property
        </button>
      </div>
      <div className="w-full">
        <div className="p-4 bg-black text-white ">sdfrsdfg</div>
      </div>

      {modal && (
        <div className="inset-0 flex justify-center items-center -mt-48 w-full h-full">
          <div className="absolute inset-0 bg-black bg-opacity-50 w-full h-[120vh]"></div>
          <div className="relative bg-white z-10 rounded overflow-scroll h-[600px]">
            <div className="text-end p-4 cursor-pointer">
              <h1 onClick={() => setModal(false)}>X</h1>
            </div>
            <h1 className="font-bold text-xl text-center  border-b-2">
              Add Property
            </h1>
            <div className="p-4 ">
              <form>
                <div className="p-5">
                  <select
                    id="options"
                    name="options"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    required
                    className="mt-1 block p-2 border-gray-300 rounded-md shadow-lg focus:outline-none"
                  >
                    <option value="" disabled>
                      Property for?
                    </option>
                    <option value="sales">Sales</option>
                    <option value="leasing">Leasing</option>
                  </select>
                </div>
                <div className="flex gap-5 p-5">
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Property Name"
                    required
                    value={propertyname}
                    onChange={(e)=>setPropertyName(e.target.value)}
                  />
                  <select
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    required
                    onChange={(e) => setPropertyType(e.target.value)}
                    value={propertytype} 
                    >
                    <option value="" disabled>Select Property Type</option> 
                    <option value="residential">Residential</option>  
                    <option value="commercial">Commercial</option>
                    </select>
                  <input
                    type="number"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Available Units"
                    required
                    value={availableunits}
                    onChange={(e)=>setAvailableUnits(e.target.value)}
                  />
                </div>

                <div className="flex gap-5 p-5">
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Area Name"
                    value={areaname}
                    onChange={(e)=>setAreaname(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Google Map Location"
                    required
                    value={location}
                    onChange={(e)=>{setLocation(e.target.value)}}
                  />
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Zone Number"
                    value={zonenumber}
                    onChange={(e)=>setZoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-5 p-5">
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Street Number"
                    value={streetnumber}
                    onChange={(e)=>setStreetNumber(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    placeholder="Building Number"
                    value={buildingnumber}
                    required
                    onChange={(e)=>setBuildingNumber(e.target.value)}
                  />
                  <select
                    className="border shadow-lg h-10 text-sm p-2 focus:outline-none rounded"
                    value={contracttype} 
                    onChange={(e) => setContractType(e.target.value)} 
                    required
                    >
                    <option value="" disabled>Select Contract Type</option>
                    <option value="Exclusive">Exclusive</option> 
                    <option value="Non-Exclusive">Non-Exclusive</option>
                    </select>
                </div>

                <div className="">
                  <div className="p-4 md:flex justify-between">
                    <div className="py-3">
                      <input
                        type="file"
                        id="payment-file-upload"
                        className="hidden"
                        onChange={handlePaymentFileChange}
                      />
                      <label
                        htmlFor="payment-file-upload"
                        className="border w-40 h-10 text-center border-gray-400 bg-white shadow-lg rounded-md p-2 cursor-pointer text-sm"
                      >
                        upload payment plan details
                      </label>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-pink-900 text-white rounded-md px-4 py-2"
                        onClick={addImageField}
                      >
                        Add Another Image
                      </button>
                    </div>
                    <div className="">

                      <button className="bg-[#10002B] px-9 py-2 text-white rounded" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex ">
                  <div className="flex flex-col gap-5 p-5">
                    {imageFields.map((field) => (
                      <div key={field.id} className="flex items-center gap-5">
                        <input
                          type="file"
                          id={`file-upload-${field.id}`}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, field.id)}
                        />
                        <label
                          htmlFor={`file-upload-${field.id}`}
                          className="border w-40 h-10 text-center border-gray-400 bg-white shadow-lg rounded-md p-2 cursor-pointer text-sm"
                        >
                          Add Image
                        </label>
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-md px-3 py-1"
                          onClick={() => removeImageField(field.id)}
                        >
                          Delete
                        </button>
                        {field.file && (
                          <img
                            src={URL.createObjectURL(field.file)}
                            alt="Selected"
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
