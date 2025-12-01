import { Router } from "express";
const SubscriptionRouter = Router();


SubscriptionRouter.get("/", (req, res) => {res.send({title:'Get All Subscription'});});

SubscriptionRouter.get("/:id", (req, res) => {res.send({title:'GET Subscription Detials'});});

SubscriptionRouter.post("/", (req, res) => {res.send({title:'CREATE new Subscription'});}); 

SubscriptionRouter.put("/:id", (req, res) => {res.send({title:'Update Subscription'});});

SubscriptionRouter.delete("/:id", (req, res) => {res.send({title:'DELETE Subscription'});});

SubscriptionRouter.get("/users/:id", (req, res) => {res.send({title:'GET ALL USER Subscription'});});

SubscriptionRouter.put("/:id/cancel", (req, res) => {res.send({title:'CANCEL Subscription'});});

SubscriptionRouter.get("/upcomming-renewals", (req, res) => {res.send({title:'GET up-comming renewals '});});



export default SubscriptionRouter;