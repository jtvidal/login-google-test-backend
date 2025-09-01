import User from "../models/user.model";

class UserController {
  constructor() {}
  async createUser(req, res, next) {
    try {
        const { email, password, name, lastname, document } = req.body;
        const user = await User.create(data);
        res.status(201).json(user);
    } catch (error) {}
  }
}
