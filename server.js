const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({path: "./config/config.env"});

// Connect DB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Body Parser
app.use(express.json());
// Enable cors
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

const storesRoute = require("./routes/stores");
app.use("/api/v1/stores", storesRoute);


app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${port}`);
});
