import postModel from "../../../../DB/model/Post.js"
import commentModel from "../../../../DB/model/comment.js"
import cloudinary from "../../../utils/cloudinary.js"

export const createComment=async(req,res,next)=>{
    const post=await postModel.findById(req.params.id)
    if(!post){
        return next(new Error("post not exist",{cause:404}))
    }
    req.body.user_id=req.user._id
    req.body.post_id=post._id
    if(req.file){
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:"comment"})
        req.body.image={secure_url,public_id}
    }
    const comment=await commentModel.create(req.body)
    return res.json({message:"done",comment })
}