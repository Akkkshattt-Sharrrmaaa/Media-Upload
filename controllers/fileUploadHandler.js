const File = require("../models/file")
const cloudinary = require("cloudinary").v2

///////////////////////////// additional functions used in uploading ////////////////////////////////////

function fileSupported( supportedTypes, fileType){
    console.log("inside the function to check if file type suported")
    return supportedTypes.includes(fileType);
}

async function uploadToCloudinary( file , folder){
    console.log("inside uplaod to cloudinary function")
    const options = { folder}
    options.resource_type = "auto"
    return await cloudinary.uploader.upload( file.tempFilePath , options)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// local file upload handler ///////////////////////////////////////////////////
exports.localFileUploadHandler = async ( req , res ) => {

    try{

        // get the file from the request
        const file = req.files.file
        console.log("File recieved from the request : ", file)

        // path where the file is to be stored locally
        const path = __dirname + "/files/" + Date.now();

        // storing the file locally
        file.mv(path, (error)=>{
            console.log(error)
        })

        res.json({
            success : true,
            message : "file uplaoded successfully"
        })

    }catch (error){
        res.json({
            success : false,
            message : "upload handler me fat gaya"
        })
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// image upload hander //////////////////////////////////////////////

exports.imageUploadHandler = async ( req , res ) => {
    try{
        // fetch data from body
        const { name , email , tags } = req.body;

        // get the file
        const file = req.files.imageFile;

        // validation on file type
        const supportedTypes = [ "jpg" , "png", "jpeg"]
        const fileType = file.name.split(".")[1].toLowerCase();
        if( !fileSupported( supportedTypes , fileType) ){
            return res.json({
                success : false,
                message : "File type not supported"
            })
        }

        // store to cloudinary
        const response = await  uploadToCloudinary( file , "MyFolder")
        console.log("after returning from upload to cloudinary function")
        console.log(response)

        // store in the database
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl : response.secure_url
        })
        // we will store name , email , tags , but not the actual image
        // instead of the image, we will store the link we get from cloudinary

        return res.json({
            success : true,
            message : "Image uplaoded succe ssfully"
        })
    }
    catch ( error ) {
        console.log( error );
        res.json({
            success : false,
            message : "error in uploading the image"
        })
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////// video upload handler //////////////////////////////////////////////

exports.videoUploadHander = async ( req , res ) => {
    try{

        //fetch data from req
        const { name , email , tags } = req.body;
        //get the file from the request
        const file = req.files.videoFile;
        console.log("file is : ",file)

        // validation on the video file
        const supportedTypes = [ "mp4","mov"]
        const fileType = file.name.split(".")[1].toLowerCase();
        if( !fileSupported( supportedTypes , fileType) ){
            return res.json({
                success : false,
                message : "File type not supported"
            })
        }

        // store to cloudinary
        const response = await  uploadToCloudinary( file , "MyFolder")
        console.log("after returning from store to cloudinary function")
        console.log( response )

        // store to the database
        const vidData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        })

        return res.json({
            success : true,
            message : " video upload successful"
        })



    }
    catch ( error ){

        return res.json({
            success : false,
            message : "video upload failed"
        })
    }
}