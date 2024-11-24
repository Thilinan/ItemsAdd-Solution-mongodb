const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB client
const { MongoClient, ObjectId } = require("mongodb");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Used to parse JSON data from incoming requests

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/";

// Initialize MongoDB client
const client = new MongoClient(mongoURI);

// Connect to MongoDB
async function connectiontest() {
  try {
    await client.connect(); // Establish the connection
    await client.db("admin").command({ ping: 1 }); // Test the connection
    console.log("Connection to MongoDB is successful.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

connectiontest().catch(console.dir);

// Insert Items Route
app.post("/api/items", async (req, res) => {
  try {
    const database = client.db("myDatabase");
    const collection = database.collection("Items1");

    const { itemCode, name, price, quantity } = req.body;

    // Insert the new item into the MongoDB collection
    const result = await collection.insertOne({
      itemCode,
      name,
      price,
      quantity,
    });

    // Return the result of the insertion
    res.status(201).json({
      message: "Item added successfully",
      item: {
        itemCode,
        name,
        price,
        quantity,
        id: result.insertedId, // Include the inserted item ID
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item", error: error.message });
  }
});

// Get Items
app.get("/api/items", async (req, res) => {
  try {
    const database = client.db("myDatabase");
    const collection = database.collection("Items1");

    // Fetch all items from the collection
    const items = await collection.find().toArray();

    // Return the fetched items
    res.status(200).json({ message: "Items fetched successfully", items });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: error.message });
  }
});

// Get Item by ID route
app.get("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const database = client.db("myDatabase");
    const collection = database.collection("Items1");

    // Find the item by its ObjectId
    const item = await collection.findOne({ _id: new ObjectId(id) });

    if (item) {
      res.status(200).json({ message: "Item fetched successfully", item });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch item", error: error.message });
  }
});

// Update Item by ID route
app.put("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemCode, name, price, quantity } = req.body;

    const database = client.db("myDatabase");
    const collection = database.collection("Items1");

    // Update the item in the MongoDB collection
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Use the item ID from the request params
      {
        $set: {
          itemCode,
          name,
          price,
          quantity,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ message: "Item not found or no changes made" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
});


// Delete Item by ID route
app.delete("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const database = client.db("myDatabase");
    const collection = database.collection("Items1");

    // Delete the item from the MongoDB collection
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete item", error: error.message });
  }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
