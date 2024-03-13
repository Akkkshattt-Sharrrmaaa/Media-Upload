const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config


exports.connectDb = async () => {

        mongoose.connect( process.env.DB_URL , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        .then(
            console.log("db connection successful")
        )
        .catch( (error) => {
            console.error(error)
            console.log("db connection unsuccessful")
            process.exit(1)
        })

}