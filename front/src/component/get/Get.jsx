import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Get() {
  // State to store fetched items
  const [items, setItems] = useState([]);

  // Fetch items from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setItems(data.items); // Store the fetched items in state
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);



  // Delete an item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Filter out the deleted item from the state
        setItems(items.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error deleting item:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Items List</h1>

          {/* Table to display items */}
          <Link to={"/add"}>
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Add Items
            </button>
          </Link>
          <table className="w-full table-auto border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Item Code
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render each item in a table row */}
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {item.itemCode}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link to={`/update/${item._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Get