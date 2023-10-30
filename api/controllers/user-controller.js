import bcryptjs from 'bcryptjs';
import User from '../models/user-model.js';

export const test = ('/test', (req, res) => {
    res.json({
        message: 'Api route is working',
    });
});

