const express = require("express")
const router = express.Router()

const { localFileUploadHandler } = require("../controllers/fileUploadHandler")

// routes
    // upload from local device
router.post("/localUpload", localFileUploadHandler)
    // upload image to cloudinary
router.post()
    // upload video to cloudinary
router.post()
    // reduce image size and upload
router.post()

module.exports = router;