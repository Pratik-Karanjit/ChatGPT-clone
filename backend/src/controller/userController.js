import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import expressAsyncHandler from "express-async-handler";
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken, verifyToken } from "../utils/token.js";
import { Token, User } from "../Schema/model.js";


export let createUser = expressAsyncHandler(async (req, res, next) => {
    let data = req.body;             
    // console.log(data)                    
    data.isVerify = false                               
    data.isDeactivate = false                                 
    let email = data.email                                 
    let user = await User.findOne({ email:email });      
    
    if (user) {                                            
      let error = new Error("Duplicate email.");              
      error.statusCode = 409;
      throw error;
    }else{                                                 
      let _hashPassword = await hashPassword(data.password);
    data.password = _hashPassword;
    let result = await User.create(req.body);
    delete result._doc.password;                         
    let infoObj = {                                        
      id: result._id,
      role: result.role,
    };
    let expireInfo = {
      expiresIn: "1d",
    };
    let token = await generateToken(infoObj, expireInfo);   
    await Token.create({ token });
    let link = `${baseUrl}/verify-email?token=${token}`     
    console.log(link)
    await sendMail({
      from: '"Chat.AI" <chatAI@gmail.com>',    
      to: [data.email],
      subject: "Email verification",
      html: `<h1>
      Verify Email 
      <a href = "${link}">Click to verify</a>               
      <h1>`,
    });
  
    successResponse(res, HttpStatus.CREATED, "User created successfully", result);
    }
    
  });



  export let verifyEmail = expressAsyncHandler(async (req, res, next) => {
    let id = req.info.id; 
    let tokenId = req.token.tokenId   
    let result = await User.findByIdAndUpdate(        
      id,
    { isVerify: true },    
      { new: true }    
    );
    await Token.findByIdAndDelete(tokenId)    
  
    successResponse(
      res,
      HttpStatus.CREATED,
      "Email verified successfully.",
      result
    );
  });
  
  export let loginUser = expressAsyncHandler(async (req, res, next) => {
    let email = req.body.email;       
    let password = req.body.password;
    let data = await User.findOne({ email: email });
  
    if (!data) {                      
      let error = new Error("Credential doesn't match");
      error.statusCode = 401;
      throw error;
    } else 
    {
      let isValidPassword = await comparePassword(password, data.password); 
      if (!isValidPassword) {                       
        let error = new Error("Credential doesn't match");
        error.statusCode = 401;
        throw error;
      } else {
        if (!data.isVerify) {               
  
          let error = new Error("Please Verify Your Account First.");
          error.statusCode = 401;
          throw error;
        } else {                  
          let infoObj = {
            id: data._id,
            role: data.role,
            email: data.email,                    //Adding email in infoObj to send in response to the frontend
                                                  //This is done as to show the email address of the user when hes logged in
          };
          let expireInfo = {
            expiresIn: "365d",
          };
          let token = await generateToken(infoObj, expireInfo);    
          await Token.create({ token });       
          res.json({ token, email: infoObj.email });              //Sent the email in response and is get in the CreateLogin file of frontend where SetLoginInfo is done
          successResponse(res, HttpStatus.CREATED, "Login Successfully", token);
        }
      }
    }
  });

  export let readAllUser = expressAsyncHandler(async (req, res, next) => {
    try {
      let result = await User.find({ name: "nitan" });
  
      successResponse(res, HttpStatus.OK, "Read User  successfully", result);
    } catch (error) {
      errorResponse(res, HttpStatus.BAD_REQUEST, error.message);
    }
  });