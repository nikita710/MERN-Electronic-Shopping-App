import { User } from "../model/UserModel.js";

export async function createUser(req, res) {}

// Fetch User
export async function fetchUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(
      id,
      "id email addresses firstName lastName"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Update user
export async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}
