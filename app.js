import express from "express";
import { PORT } from "./config/env.js";
import connectToDB from "./database/mongodb.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
// Routes

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-Rate-Limit-*` headers
});

// Apply the rate limiter to all requests
app.use(apiLimiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", SubscriptionRouter);
// Error Middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription App!");
});

app.listen(PORT, () => {
  console.log(`Subscription App is running on http://localhost:${PORT}`);
  connectToDB()
});
