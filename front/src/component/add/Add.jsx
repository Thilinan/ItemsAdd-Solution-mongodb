import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Add() {
  // State to manage form fields
  const [formData, setFormData] = useState({
    itemCode: "",
    name: "",
    price: "",
    quantity: "",
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
    const response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Item added successfully!");
      setFormData({ itemCode: "", name: "", price: "", quantity: "" });
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form.");
  }
    
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Insert Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Code Field */}
            <div>
              <label
                htmlFor="itemCode"
                className="block text-sm font-medium text-gray-700"
              >
                Item Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemCode"
                name="itemCode"
                placeholder="Enter unique item code"
                required
                value={formData.itemCode}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Price Field */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter item price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Quantity Field */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
            <div className=''>
              <Link to={"/get"} className='text-green-600 font-bold text-sm underline relative left-32'>View Your Add Items </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add