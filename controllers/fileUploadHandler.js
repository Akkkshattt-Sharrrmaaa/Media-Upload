// const File = require("../models/file")

exports.localFileUploadHandler = async ( req , res ) => {

    try{

        // get the file from the request
        const file = req.files.file
        console.log("File aa gayi apan ke pas", file)

        // path where the file is to be stored locally
        const path = __dirname + "/files/" + Date.now() + file.name;

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