import API from "@/api";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { icons } from "@/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ConversationContainer from "./ConversationContainer";
import NoChatSelected from "./NoChatSelected";
import TextArea from "./TextArea";

const MessageContainer = () => {
  const [sideBarVisible, setsidebarVisible] = useState(false);
  const [currentConvo, setCurrentConvo] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("http://localhost:4000/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("adduser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [currentUser]);

  const { data: conversations, isLoading: convosFetchingLoading } = useQuery({
    queryKey: ["conversations", currentUser?.id],
    queryFn: async () => {
      const res = await API.get(`/conversation/${currentUser?.id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: fetchedMessages, isLoading: messagesFetchingLoading } =
    useQuery({
      queryKey: ["messages", currentConvo?._id],
      queryFn: async () => {
        const res = await API.get(`/message/${currentConvo?._id}`, {
          withCredentials: true,
        });
        setMessages(res.data);
        return res.data;
      },
      enabled: !!currentConvo, // Only run this query if there's a current conversation
      onSuccess: (data) => {
        setArrivalMessage(null); // Reset arrivalMessage when messages are fetched successfully
      },
    });

  const updateMessages = (newMessage) => {
    if (
      arrivalMessage &&
      currentConvo?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  useEffect(() => {
    updateMessages(arrivalMessage);
  }, [arrivalMessage, currentConvo]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: async (msg) => {
      const res = await API.post("/message", msg, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", currentConvo?._id]);
    },
  });

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      sender: currentUser.id,
      text: newMessage,
      conversationId: currentConvo._id,
    };

    updateMessages(message);

    const receiverId = currentConvo.members.find((u) => u !== currentUser.id);

    socket.current.emit("sendMessage", {
      senderId: currentUser.id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      await sendMessage(message);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container h-full flex bg-white relative">
      {/* chat side menu */}
      <ConversationContainer
        conversations={conversations}
        setsidebarVisible={setsidebarVisible}
        sideBarVisible={sideBarVisible}
        setCurrentConvo={setCurrentConvo}
        currentUser={currentUser}
        convosFetchingLoading={convosFetchingLoading}
      />
      {/* chat box container */}
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
                  <div className="text-gray-500 text-5xl">Send a nessage</div>
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
    </div>
  );
};

export default MessageContainer;
