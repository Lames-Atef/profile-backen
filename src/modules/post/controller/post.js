import cloudinary from "cloudinary"
import postModel from "../../../../DB/model/Post.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
export const post =async(req,res,next)=>{
    const postList=[]
    const cursor=await postModel.find().populate([
        {
            path:"user_id",
            select:"profilePic"
        },{
            path:"like",
            select:"profilePic"
        },{
            path:"unlike",
            select:"profilePic"
        }
    ]).cursor()

for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  console.log(doc); // Prints documents one at a time
}
}



export const createPost=asyncHandler( async(req,res,next)=>{
    const{tittle,caption}=req.body
    const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'Post'})
    const post=await postModel.create({caption,tittle,user_id:req.user._id,image:{secure_url,public_id}})
    return res.status(201).json({message:"done",post})
})
export const likePost=async(req,res,next)=>{
    const{id}=req.params
    const{_id}=req.user
    const post=await postModel.findByIdAndUpdate(id,{$addToSet:{like:_id},$pull:{unlike:_id}},{new:true} )
    if(!post){
        return next(new Error("invalid post",{cause:404}))
    }
    post.totalVote=post.like.length-post.unlike.length
    await post.save()
    return res.json({message:"done",post})
}
export const unlikePost=async(req,res,next)=>{
    const{id}=req.params
    const{_id}=req.user
    const post=await postModel.findByIdAndUpdate(id,{$addToSet:{unlike:_id},$pull:{like:_id}},{new:true} )
    if(!post){
        return next(new Error("invalid post",{cause:404}))
    }
    post.totalVote=post.like.length-post.unlike.length
    await post.save()
    return res.json({message:"done",post})
}