const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {folder: 'Products',
    format: async (req, file) => file.format,
    // supports promises as well   
    public_id: (req, file) => file.originalname,
    },
});

const parser = multer({ storage: storage });


module.exports = parser;