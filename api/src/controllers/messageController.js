import Message from "../models/Message.js";

// create a new message
export const addMessage = async (req, res) => {
  const { sender, text, conversationId } = req.body;

  try {
    if (!sender || !text || !conversationId) {
      return res.status(400).json("Required informations are missing");
    }

    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();

    if (!savedMessage) return res.status(400).json("Invalid message data");

    res.status(200).json(savedMessage);
  } catch (error) {
    console.log("Error in addMessage controller", error.message);
    return res.status(500).json("Internal server error");
  }
};

// get all messages for a particular conversation
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.convoId,
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    return res.status(500).json("Internal server error");
  }
};
