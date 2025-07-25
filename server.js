const express = require("express");
const app = express();
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes.js");

// Server Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Make sure to change this is Production!!
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT: ${process.env.PORT}`)
);
