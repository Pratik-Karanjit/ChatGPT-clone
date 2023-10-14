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
    let email = req.body.email;         //getting email from postman and setting it in a variable
    let password = req.body.password;   //getting password from postman and setting it in a variable
    let data = await User.findOne({ email: email }); //if not present null, if present, gives output in object
    // console.log(data)
    if(data.isDeactivate) {
      await User.findByIdAndUpdate(data._id, {isDeactivate: false});  //isDeactivate false when logged in
     }
  
    if (!data) {                        //if it doesn't match the database's email throw this
      let error = new Error("Credential doesn't match");
      error.statusCode = 401;
      throw error;
    } else 
    {
      let isValidPassword = await comparePassword(password, data.password);   //checking if password matches
      if (!isValidPassword) {                            //if it doesn't match the database's password, throw error
        let error = new Error("Credential doesn't match");
        error.statusCode = 401;
        throw error;
      } else {
        if (!data.isVerify) {                  //If it is not verified, throw error
  
          let error = new Error("Please Verify Your Account First.");
          error.statusCode = 401;
          throw error;
        } else {                    //If it is verified, generate token
          let infoObj = {
            id: data._id,
            role: data.role,
          };
          let expireInfo = {
            expiresIn: "365d",
          };
          let token = await generateToken(infoObj, expireInfo);      //calling the generateToken function
          await Token.create({ token });             //Theres a separate DB for Token so we are saving it there
          res.json({ token }); // Send the token as part of the response
          successResponse(res, HttpStatus.CREATED, "Login Successfully", token);
        }
      }
      // console.log("isValidPassword", isValidPassword);
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