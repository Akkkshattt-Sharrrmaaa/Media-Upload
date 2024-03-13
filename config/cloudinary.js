const cloudinary = require("cloudinary").v2
require("dotenv").config()

exports.cloudinaryConnect = ( ) => {

    try{

        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY_CLOUDINARY,
            api_secret : process.env.API_SECRET_CLOUDINARY
        })

        console.log("Cloudinary connection successful")

    } catch ( error ){
        console.log("Unsuccessful connection to cloudinary")
        console.log(error);
    }
}