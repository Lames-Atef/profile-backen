import userModel from "../../../../DB/model/User.js"

import { asyncHandler } from '../../../utils/errorHandling.js'
import { compare, hash } from '../../../utils/HashAndCompare.js'


export const profilePicture=async(req,res,next)=>{
    const imagUrL=req.file.dest
    const user=await userModel.findByIdAndUpdate(req.user._id,{profilePic:req.file.dest},{new:true})
    return res.json({message:"done",imagUrL,file:req.file}) 
}
// export const profilePictureCover=async(req,res,next)=>{
//     const imagUrL=req.file.dest
//     // const user=await userModel.findByIdAndUpdate(req.user._id,{profilePic:req.file.dest},{new:true})
//     return res.json({message:"done",imagUrL,file:req.files}) 
// }

export const getProfile = asyncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.user._id)
    return res.status(200).json({ message: "Done", user })
})


export const sharedProfileData = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.params.id).select('userName email profilePic')
    return user ? res.status(200).json({ message: "Done", user }) :
        next(new Error('In-valid account Id', { cause: 404 }))
})

export const updatePassword = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(_id)
    if (!compare({ plaintext: oldPassword, hashValue: user.password })) {
        return next(new Error("In-valid old Password", { cause: 400 }))
    }
    const hashPassword = hash({ plaintext: newPassword })
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Done" })
})

export const logOut=async (req,res,next)=>{
    const{email}=req.body
    const userExist=await userModel.findOne({email})
    const user=await userModel.findOneAndDelete({email,status:'online',isLogin:true},{isLogin:false,lastSeen:Date.now()})
return user?res.json({message:"done"}):res.json({message:"fail"})

}