import bcryptjs from 'bcryptjs';
import Listing from "../models/car-listing-model.js";

export const test = ('/test', (req, res) => {
    res.json({
        message: 'Api route is working',
    });
});

export const getUserListings = async (req, res, next) => {
    
    if (req.user.id === req.params.id) {
        try {
          const listings = await Listing.find({ userRef: req.params.id });
          res.status(200).json(listings);
        } catch (error) {
          next(error);
        }
      } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
      }
};
