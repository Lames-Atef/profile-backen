import joi from 'joi'
import { generalField } from '../../middleware/validation.js'


export const getSharedProfile = {
    params: joi.object({
        id: joi.string().min(24).max(24).required()
    }).required()
}

export const updatePassword = {
    body: joi.object({
        oldPassword: generalField.password,
        newPassword: generalField.password.invalid(joi.ref('oldPassword')),
        cNewPassword: generalField.cPassword.valid(joi.ref('newPassword')),
    }).required()
}