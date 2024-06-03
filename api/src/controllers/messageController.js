import Message from "../models/Message.js";

// add message
export const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get message
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.convoId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
