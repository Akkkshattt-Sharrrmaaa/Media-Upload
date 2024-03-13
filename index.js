const express = require("express")
const app = express()

// make use of env file
require("dotenv").config()
const PORT = process.env.PORT || 4000

// use of middlewares
app.use(express.json())
const fileUpload = require("express-fileupload")
app.use(fileUpload())


// connect to the database
const db = require("./config/database")
db.connectDb()

// connect to cloudinary
const cloud = require("./config/cloudinary")
cloud.cloudinaryConnect()

// mount the routes
const uploads = require("./routes/fileRoutes")
app.use("/api/v1", uploads)


// make app listen to a port
app.listen( PORT , ()=>{
    console.log("App is up and running")
    console.log(`Port no : ${PORT}`)
})
