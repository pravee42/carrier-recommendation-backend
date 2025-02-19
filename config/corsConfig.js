const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:3000"], // Adjust based on frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
