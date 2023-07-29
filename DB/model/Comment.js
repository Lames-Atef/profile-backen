
import mongoose, { model, Schema, Types } from "mongoose";
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    image:{type:Object}
    ,
   user_id: {
        type: Types.ObjectId,
        ref:'User',
        required:true
    },
    post_id: {
        type: Types.ObjectId,
        ref:'Post',
        required:true
    },
    like:[ {
        type: Types.ObjectId,
        ref:'User'
    }]
 ,
 unlike:[ {
    type: Types.ObjectId,
    ref:'User'
}],
isdeleted:{
    type:Boolean,
    default:false

}},
 {
    timestamps: true
})


const commentModel = mongoose.models.Comment || model('Comment', commentSchema);
export default commentModel