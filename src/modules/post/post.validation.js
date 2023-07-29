import joi from "joi"
import { generalField } from "../../middleware/validation.js"
export const createPost={body:joi.object({
tittle:joi.string().required(),
caption:joi.string()
}
).required(),
file:joi.object({}).required()}
export const likeOrUnlikePost={
    params:joi.object({
        id:generalField.id,
    }).required()
}
export const createComment={body:joi.object({
    text:joi.string().required(),
    }
    ).required(),
    params:joi.object({
        id:generalField.id,
    }).required(),
    file:joi.object({}).required()}