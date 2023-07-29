import { Router } from "express";
import { validation } from "../../middleware/validation.js";

import { loginSchema, signupSchema } from "./auth.validation.js";
import * as  authController from './Controller/auth.js'
const router = Router()


router.patch("/resetPassword",authController.resetPassword)
router.patch("/forgetPassword",authController.forgetPassword)
router.get("/" ,  authController.getAuthModule)
router.get("/confirmEmail/:token" , authController.confirmEmail)


router.post("/signup" , validation(signupSchema),   authController.signup)
router.post("/login" , validation(loginSchema),   authController.login)



export default router