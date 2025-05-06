const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/business", require("./routes/businessRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/verified", require("./routes/verifiedUserRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
// DB & Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
