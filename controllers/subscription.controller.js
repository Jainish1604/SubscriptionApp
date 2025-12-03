import Subscription from '../models/subscription.model.js';

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            status: true,
            data: subscriptions
        });
    }
    catch (error) {
        next(error);
    }

}

export const getSubscriptionById = async (req, res, next) => {

    try {
        const subscription = await Subscription.findById(req.params.id);

        res.status(200).json({
            status: true,
            data: subscription
        });
    }
    catch (error) {
        next(error);
    }
}

export const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = await Subscription.create({...req.body,user:req.user._id});

        res.status(201).json({
            status: true,
            data: newSubscription
        });
        
    }
    catch (error) {
        next(error);
    }
}


export  const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id != req.params.id){
            return res.status(401).json({status:false,message:"Unauthorized access"});
        }
        const userSubscriptions = await Subscription.find({user:req.params.id});
        res.status(200).json({
            status: true,
            data: userSubscriptions
        });
    }
    catch (error) {
        next(error);
    }
}   
