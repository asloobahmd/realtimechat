import User from "../models/User.js";

// get a user by userId
export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser controller", error.message);
    return res.status(500).json("Internal server error");
  }
};

// get all users except current User - search functionality
export const getAllUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    const users = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    // converting user id to string because mongoDB's default _id will be BSON format and will always give false if we comapre
    const userId = req.user._id.toString();

    const filteredUsers = users.filter((u) => u._id.toString() !== userId); // here also doverting to string for same purpose

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    return res.status(500).json("Internal server error");
  }
};
