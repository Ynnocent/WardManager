const express = require("express");
const app = express();
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const dbConnect = require("./db/connect.js");


// Server Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Make sure to change this is Production!!
  })
);

// DB init
const db = dbConnect.initDB();

// Routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes)


// Server Port
if (!db) {
  console.log("Error connecting to DB");
} else {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on PORT: ${process.env.PORT}`)
  );
}
