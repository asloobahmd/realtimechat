import { useState } from "react";
import Conversation from "./Conversation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api";

const ConversationContainer = ({
  conversations,
  setsidebarVisible,
  sideBarVisible,
  setCurrentConvo,
  currentUser,
  convosFetchingLoading,
}) => {
  const [searchVal, setSearchVal] = useState("");

  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users", searchVal],
    queryFn: async () => {
      const res = await API.get(`/user?search=${searchVal}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!searchVal,
  });

  const { mutateAsync: createConvo } = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/conversation", payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setCurrentConvo(data);
      setsidebarVisible(false);
      queryClient.invalidateQueries(["conversations", currentUser?.id]);
    },
  });

  const handleClick = async (receiverId) => {
    try {
      const res = await createConvo({
        senderId: currentUser.id,
        receiverId: receiverId,
      });
      setSearchVal("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex-1 max-md:absolute max-md:bg-indigo-950 max-md:text-white z-50  inset-y-0 w-[300px] transition-[left] duration-500 ${
        sideBarVisible ? "left-0" : "-left-full"
      }`}
    >
      <div className="p-[10px] h-full  max-md:pt-[40px] relative">
        <button
          className="absolute top-2 right-2 md:hidden"
          onClick={() => setsidebarVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x "
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <input
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
          type="search"
          placeholder="Search for a user.."
          className="w-full p-3 rounded-md bg-gray-100 border text-black border-gray-300 outline-none"
        />
        {searchVal && users?.length > 0 && (
          <div className="absolute flex flex-col gap-y-1 text-black bg-white shadow-md rounded-md w-[90%] p-2">
            {users?.map((u) => (
              <div
                key={u._id}
                className="cursor-pointer p-2 hover:bg-gray-300 rounded-sm"
                onClick={() => handleClick(u._id)}
              >
                {u.username}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col pr-2 gap-2 mt-2 h-[90%] overflow-y-auto">
          {convosFetchingLoading ? (
            <div>Loading...</div>
          ) : conversations?.length > 0 ? (
            conversations?.map((convo) => (
              <div
                className=""
                onClick={() => {
                  setCurrentConvo(convo);
                  setsidebarVisible(false);
                }}
                key={convo._id}
              >
                <Conversation convo={convo} currentUser={currentUser} />
              </div>
            ))
          ) : (
            <span className="text-gray-500 p-2">
              You don't have any conversations.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationContainer;
