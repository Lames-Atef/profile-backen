import { Router } from "express";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import {fileUpload,  fileValidation } from "../../utils/multer.js";
import * as  userController from './controller/user.js'
import * as validators from './user.validation.js'

const router = Router()

router.patch("/profilePic",auth,fileUpload('user/profile',fileValidation.image).single('image'),userController.profilePicture)


router.get("/profile", auth, userController.getProfile)
router.get("/:id/profile", validation(validators.getSharedProfile), userController.sharedProfileData)
router.patch("/password", validation(validators.updatePassword), auth, userController.updatePassword)
router.put("/logout", userController.logOut)




export default router