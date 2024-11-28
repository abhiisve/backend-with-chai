import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: ture
        },
        avatar: {
            type: String, // cloud URL
            required: true
        },
        coverimage: {
            type: String,
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        },    

    },
    {
        timestamps: true
    }

);

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next(); //if password not modified, then stop the process
    this.password = bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(this.password, password);
}

userSchema.methods.generateAccessToken = function ( ){
    jwt.sign(
        {
            _id : this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.Access_Token_Secret,
        {
            expiresIn: process.env.Access_Token_Expiry
        }
    )
}
userSchema.methods.generateRefreshToken = function ( ){
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRSH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema);
