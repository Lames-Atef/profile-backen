
import mongoose, { model, Schema, Types } from "mongoose";
const postSchema = new Schema({
    tittle: {
        type: String,
        required: true
    },
   caption: {
        type: String
    },
    image:{type:Object,
    required:true}
    ,
   user_id: {
        type: Types.ObjectId,
        ref:'User'
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

},totalVote:{
    type:Number,
    default:0

}},
 {
    timestamps: true
})


const postModel = mongoose.models.Post || model('Post', postSchema);
export default postModel