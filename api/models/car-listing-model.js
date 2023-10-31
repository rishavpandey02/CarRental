import mongoose from "mongoose";

const carListingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        address:{
            type: String, 
            required: true,
        },

        regularPrice: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
            required: true,
        },

        offer: {
            type: Boolean,
            required: true,
        },

        seats: {
            type: Number,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
        },

        imageUrls: {
            type: Array,
            required: true,
        },

        userRef: {
            type: String, 
            required: true,
        }
        
    }, { timestamps: true }
)

const carListing = mongoose.model('carListing', carListingSchema);

export default carListing;