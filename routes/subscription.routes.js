import { Router } from "express";
import { createSubscription, getSubscriptionById, getSubscriptions,getUserSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const SubscriptionRouter = Router();


SubscriptionRouter.get("/",authorize, getSubscriptions);

SubscriptionRouter.get("/:id",authorize, getSubscriptionById);

SubscriptionRouter.post("/",authorize, createSubscription); 

SubscriptionRouter.put("/:id", (req, res) => {res.send({title:'Update Subscription'});});

SubscriptionRouter.delete("/:id", (req, res) => {res.send({title:'DELETE Subscription'});});

SubscriptionRouter.get("/user/:id", authorize ,getUserSubscription);

SubscriptionRouter.put("/:id/cancel", (req, res) => {res.send({title:'CANCEL Subscription'});});

SubscriptionRouter.get("/upcomming-renewals", (req, res) => {res.send({title:'GET up-comming renewals '});});



export default SubscriptionRouter;