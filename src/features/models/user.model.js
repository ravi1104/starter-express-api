import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique:true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  department:{
    type:String,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
  review:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'performancereview',
  }]
});
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const userModel = mongoose.model('user', userSchema);
