import API from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { icons } from "@/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import NoChatSelected from "./NoChatSelected";
import TextArea from "./TextArea";
import { Button } from "./ui/button";

const MessageContainer = ({ currentConvo, setsidebarVisible }) => {
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { socket } = useSocket();

  const scrollRef = useRef();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  const { data: messages, isLoading: messagesFetchingLoading } = useQuery({
    queryKey: ["messages", currentConvo?._id],
    queryFn: async () => {
      const res = await API.get(`/message/${currentConvo?._id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!currentConvo,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    // cleanup function
    return () => socket.off("getMessage");
  }, [socket]);

  const updateMessages = (newMessage) => {
    queryClient.setQueryData(["messages", currentConvo?._id], (old) => [
      ...old,
      newMessage,
    ]);
  };

  useEffect(() => {
    if (arrivalMessage) {
      updateMessages(arrivalMessage);
    }
  }, [arrivalMessage]);

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: async (msg) => {
      const { data } = await API.post("/message", msg, {
        withCredentials: true,
      });
      return data;
    },
    // data contains return data fro mutaion fn, variables are paramters of mutation fn, context is the context returned from mutaiom fn
    onSuccess: (data, variables, context) => {
      updateMessages(data);
    },
  });

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      sender: currentUser.id,
      text: newMessage,
      conversationId: currentConvo._id,
    };

    const receiverId = currentConvo.members.find((u) => u !== currentUser.id);

    try {
      await sendMessage(message);
      //send message to socket server
      socket?.emit("sendMessage", {
        senderId: currentUser.id,
        receiverId: receiverId,
        text: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-[2]">
      <div className=" flex flex-col gap-1 h-full max-md:pt-[40px]">
        <Button
          className="absolute top-1 left-2 md:hidden text-black bg-transparent hover:bg-transparent"
          onClick={() => setsidebarVisible(true)}
          size={"icon"}
        >
          {icons.menu}
        </Button>
        {currentConvo ? (
          <>
            <div className="p-4 flex-[5] overflow-y-auto flex flex-col gap-6 bg-gray-300">
              {messagesFetchingLoading ? (
                <div className="h-full">Loading...</div>
              ) : messages.length == 0 ? (
                <div className="text-gray-500 text-5xl">Send a message</div>
              ) : (
                messages?.map((m, i) => (
                  <div ref={scrollRef} key={i}>
                    <Message
                      key={i}
                      message={m}
                      own={m.sender == currentUser.id}
                    />
                  </div>
                ))
              )}
            </div>
            <TextArea
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              isPending={isPending}
              handleSend={handleSend}
            />
          </>
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
