
import mongoose, { model, Schema ,Types} from "mongoose";
const userSchema = new Schema({
    profilePic: Object,
    coverPic: [],
    lastSeen:Date,
    userName: {type: String,
        required: true
    }, email: {type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }, confirmEmail: {
        type: Boolean,
        default: false
    },status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online', 'block']
    },isLogin:{
          type:Boolean,
           default:false
    }, code:{
type:String,
default:""}, role: {type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },isDeleted:{
        type:Boolean,
        default:false
    }}, { timestamps: true
})
const userModel = mongoose.models.User || model('User', userSchema);
export default userModel