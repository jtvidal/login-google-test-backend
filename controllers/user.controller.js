import User from "../models/user.model.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

class UserController {
  constructor() {}
  async createUser(req, res, next) {
    try {
      const data = req.body;
      const userExists = await User.findOne({ where: { email: data.email } });
      if (userExists) {
        return res.status(400).json({ message: "Email already in use." });
      }
      const hashedPassword = await bcrypt.hash(data.password,10);
      data.password = hashedPassword;
      const newUser = await User.create(data);
      res.status(201).json(newUser);
    } catch (error) {

      if (error instanceof Sequelize.UniqueConstraintError) {
        return res.status(400).json({ message: "Email already in use." });
      }
      if (error instanceof Sequelize.ValidationError) {
        return res
          .status(400)
          .json({ message: error.errors.map((e) => e.message) });
      }
      console.error("Error creating user:", error);
    }
  }

  async loginUser(req,res,next){
    try {
      const data = req.body;
      const user = await User.findOne({where:{email:data.email}});
      if(!user){
        return res.status(400).json({message:"Invalid email"});
      }
      const validPassword = await bcrypt.compare(data.password,user.password);
      if(!validPassword){
        return res.status(400).json({message:"Invalid password"});
      }
      const token = jwt.sign({id:user.id,email:user.email,role:user.role},JWT_SECRET,{expiresIn:"1h"});
      res.status(200).json({token});
    } catch (error) {
      
    }
  }
}

export default new UserController();