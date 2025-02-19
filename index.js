const express = require("express");
const dotenv = require("dotenv");
const cors = require("./config/corsConfig");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors);

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

connectDB().then(() => {
    app.listen(4870, () => console.log("🚀 Server running on port 4870"));
});
