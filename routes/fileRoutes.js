const express = require("express")
const router = express.Router()

const { localFileUploadHandler , imageUploadHandler, videoUploadHander } = require("../controllers/fileUploadHandler")

// routes
    // upload from local device
router.post("/localUpload", localFileUploadHandler)
    // upload image to cloudinary
router.post("/imageUpload", imageUploadHandler)
    // upload video to cloudinary
router.post("/videoUpload", videoUploadHander)
    // reduce image size and upload
// router.post()

module.exports = router;