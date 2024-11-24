
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Updateitems() {
      const { id } = useParams(); // Get the item ID from the URL
      const navigate = useNavigate(); // To navigate after updating
      const [itemCode, setItemCode] = useState("");
      const [name, setName] = useState("");
      const [price, setPrice] = useState("");
      const [quantity, setQuantity] = useState("");

      // Fetch the item details when the component mounts
      useEffect(() => {
        axios
          .get(`http://localhost:5000/api/items/${id}`)
          .then((response) => {
            const { itemCode, name, price, quantity } = response.data.item;
            setItemCode(itemCode);
            setName(name);
            setPrice(price);
            setQuantity(quantity);
          })
          .catch((error) => {
            console.error("Error fetching item details:", error);
          });
      }, [id]);

      const handleUpdate = async (e) => {
        e.preventDefault();

        try {
          const updatedItem = { itemCode, name, price, quantity };
          await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
          alert("Item updated successfully!");
          navigate("/get"); // Redirect to the main items list after update
        } catch (error) {
          console.error("Error updating item:", error);
          alert("Failed to update item");
        }
      };
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Item
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Item Code
              </label>
              <input
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:right-4 focus:ring-green-300 ">Update Item</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateitems