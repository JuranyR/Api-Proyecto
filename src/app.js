const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://juranyr.github.io",
  "https://juranyr.github.io/proy-turismo"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

module.exports = app;