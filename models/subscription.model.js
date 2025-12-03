import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: [2, 'Subscription name must be at least 2 characters long'],
        maxlength: [100, 'Subscription name must be at most 100 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be at least 0']
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        trim: true,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY']
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']

    },
    category: {
        type: String,
        enum: ['entertainment', 'finance', 'education', 'productivity', 'health', 'technology', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'paused'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function (value) { return value <= new Date() },
            message: 'Start date cannot be in the future'
        }

    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                if (!value || !this.startDate) return true;
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });



subscriptionSchema.pre('save', function () {

    if (!this.renewalDate) {
        const frequencyMap = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        const daysToAdd = frequencyMap[this.frequency] ?? 30;

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
