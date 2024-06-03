import API from "@/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Conversation = ({ convo, currentUser }) => {
  const friendId = convo?.members.filter((e) => e != currentUser.id);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", friendId],
    queryFn: async () => {
      const res = await API.get(`/user/${friendId}`, { withCredentials: true });
      return res.data;
    },
  });

  return (
    <div className="w-full flex items-center gap-4 p-2 h-[60px] bg-gray-100 hover:bg-gray-300 text-black cursor-pointer rounded-md">
      <img
        src="https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg"
        alt=""
        className="h-[45px] w-[45px] object-cover rounded-full"
      />

      <span>{user?.username}</span>
    </div>
  );
};

export default Conversation;
