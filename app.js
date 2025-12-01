import express from "express";
import { PORT } from "./config/env.js";


import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/Auth.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", SubscriptionRouter);


app.get("/", (req, res) => {
  res.send("Welcome to Subscription App!");
});

app.listen(PORT, () => {
  console.log(`Subscription App is running on http://localhost:${PORT}`);
});
