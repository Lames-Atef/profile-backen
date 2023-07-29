import joi from "joi"
import {Types } from "mongoose"
const dataMethods = ["body", 'params', 'query' , 'headers']
const validateObjectId=(value,helper)=>{
    console.log(value);
    console.log(helper);
    return Types.ObjectId.isValid(value)?true:helper.message("in valid object id")
}

export const  generalField={
    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net',] }
    }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.string().required(),
    id:joi.string().custom(validateObjectId).required()

}

export const validation = (schema) => {
    return (req, res, next) => {
        const validationErr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        });

        if (validationErr.length) {
            return res.json({ message: "Validation Err", validationErr })
        }
        return next()
    }
}