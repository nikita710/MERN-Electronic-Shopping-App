import { User } from "../model/UserModel.js";

// register user
export const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// singing user
export async function signin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else if (user.password !== req.body.password) {
      res.status(400).json({ message: "invalid password" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: "login issue" + error });
  }
}
