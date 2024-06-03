import Conversation from "../models/Conversation.js";

// create new convo
export const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();

    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get convo of a user
export const getConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: req.params.userId },
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
};
