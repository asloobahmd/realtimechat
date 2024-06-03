import User from "../models/User.js";

// get a user by id
export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    const users = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    const userId = req.user._id.toString();

    const filteredUsers = users.filter((u) => u._id.toString() !== userId);

    if (filteredUsers.length == 0) return res.json([]);

    return res.status(200).json(filteredUsers);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
