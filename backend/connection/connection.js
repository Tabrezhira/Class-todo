const mongoose = require('mongoose');

const uri = "mongodb+srv://tabrezhira:Hamza.447@todonext.16qdi.mongodb.net/?retryWrites=true&w=majority&appName=TODONext";

async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Perform any operations here if needed (e.g., querying or inserting data)

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();
