import React from "react";
import { Button } from "./ui/button";

const TextArea = ({ newMessage, setNewMessage, isPending, handleSend }) => {
  return (
    <div className="flex-1 flex items-center gap-6 p-2 border-t bg-gray-200">
      <textarea
        name=""
        id=""
        className="flex-1 resize-none outline-none rounded-md p-3 bg-gray-100"
        placeholder="Message"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <Button
        isLoading={isPending}
        disabled={newMessage.trim().length == 0}
        onClick={handleSend}
        className="bg-green-500"
      >
        Send
      </Button>
    </div>
  );
};

export default TextArea;
