import moment from "moment";

const Message = ({ message, own }) => {
  return (
    <div>
      <div className={`flex flex-col ${own ? "items-end" : ""}`}>
        <div className="flex gap-2">
          <img
            src="https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg"
            alt=""
            className="h-[40px] w-[40px] rounded-full"
          />
          <div
            className={`${
              own ? "bg-blue-800" : "bg-red-500"
            } text-white rounded-md p-3 max-sm:w-[250px] max-w-[400px]`}
          >
            <p>{message.text}</p>
          </div>
        </div>
        <p className="text-gray-600">
          {moment(message.createdAt).startOf("hour").fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Message;
