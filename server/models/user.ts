import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profilePic: {type: String, required:false}    
  }, { timestamps: true });
  
  const User = mongoose.model("User", userSchema);
  export default User;