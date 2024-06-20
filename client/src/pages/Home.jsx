import { AuthContext } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { useContext, useState } from "react";
import ConversationContainer from "../components/ConversationContainer";
import MessageContainer from "../components/MessageContainer";

const Home = () => {
  const [sideBarVisible, setsidebarVisible] = useState(false);
  const [currentConvo, setCurrentConvo] = useState();
  return (
    <div className="container h-full flex bg-white relative">
      <ConversationContainer
        setsidebarVisible={setsidebarVisible}
        sideBarVisible={sideBarVisible}
        setCurrentConvo={setCurrentConvo}
      />
      <MessageContainer
        currentConvo={currentConvo}
        setsidebarVisible={setsidebarVisible}
      />
    </div>
  );
};

export default Home;
