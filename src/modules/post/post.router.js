import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as validators from "./post.validation.js"
import { validation } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import * as postControl from "./controller/post.js"
import * as commentControl from "./controller/comment.js"
const router = Router()

router.post("/",auth,fileUpload(fileValidation.image).single('image'),validation(validators.createPost),
postControl.createPost)

router.patch("/:id/like",auth,validation(validators.likeOrUnlikePost),postControl.likePost)
router.patch("/:id/unlike",auth,validation(validators.likeOrUnlikePost),postControl.unlikePost)
// 88888888888888888888888888888888888888888888
router.post("/:id/comment",auth,fileUpload(fileValidation.image).single('image'),validation(validators.createComment),
commentControl.createComment)
export default router