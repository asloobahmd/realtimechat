import Conversation from "../models/Conversation.js";

// create new convo for 2 users
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    if (!senderId || !receiverId) {
      return res.status(400).json("Required informations are missing");
    }

    const existConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existConversation) {
      return res.status(200).json(existConversation);
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();

    if (!savedConversation)
      return res.status(400).json("Invalid conversation data");

    res.status(200).json(savedConversation);
  } catch (error) {
    console.log("Error in createConversation controller", error.message);
    return res.status(500).json("Internal server error");
  }
};

// get all convos of the current user
export const getConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: req.params.userId },
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getConversation controller", error.message);
    return res.status(500).json("Internal server error");
  }
};
