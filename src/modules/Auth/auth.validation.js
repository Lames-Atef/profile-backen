import joi from 'joi'
import { generalField } from '../../middleware/validation.js'




export const signupSchema = {
    body: joi.object({

        userName: joi.string().min(3).max(25).alphanum().required(),
        email: generalField.email,
        password: generalField.password,
        cPassword:generalField.cPassword.valid(joi.ref("password")).required()
    }).required()
}


export const loginSchema = {
    body: joi.object({
        email: generalField.email, 
        password: generalField.password
    }).required()
}