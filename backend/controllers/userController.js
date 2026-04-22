import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
console.log("REGISTER API HIT");
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

  
    // profilePhoto
      const maleProfilePhoto = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;
      const femaleProfilePhoto = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
        const newUser=await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

    return res.status(201).json({
      success:true,
      message: "User registered successfully",
      user: newUser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

///login logic
export const login=async(req,res)=>{

  try{
    const {username,password}=req.body;
    if(!username || !password){
      return res.status(400).json({message:"All fields are required"});
  };

  const user=await User.findOne({username});

  if(!user){
    return res.status(400).json({
        message:"Incorrect username or password",
        success:false
    })
  };
  const isPasswordMatch = await bcrypt.compare(password,user.password);
  if(!isPasswordMatch)
  {
        return res.status(400).json({
        message:"Incorrect username or password",
        success:false
      })
  };
  //generate token
  const tokenData={
    userId:user._id,
    };
    const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    //store in browser's cookies
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
      success:true,
      _id:user._id,
      username:user.username,
      fullName:user.fullName,
      profilePhoto:user.profilePhoto
    })


  }
  
  catch(error){
     console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

//logout

export const logout = (req,res)=>{
  try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        success:true,
        message:"Logged out successfully."
    })
  }
  catch(error){
    console.log(error);
  }
}


//To show other users

export const getOtherusers=async(req,res)=>{
try{
    const loggedInUserId=req.id;
    const Otherusers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    return res.status(200).json(Otherusers);
}
catch(error){
  console.log(error)
}

}