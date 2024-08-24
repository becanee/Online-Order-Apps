import { ChatList, IChatListProps } from "react-chat-elements";
import FooterLayout from "../../../layouts/FooterLayout";
import { useNavigate } from "react-router-dom";

const chatListProps: IChatListProps = {
  id: "unique-chat-list-id", // Replace with an appropriate value
  lazyLoadingImage: "path/to/lazy-loading-image.jpg", // Replace with an appropriate value
  className: "your-class-name",
  dataSource: [
    {
      id: 1,
      avatar: "https://bit.ly/dan-abramov",
      alt: "User Avatar",
      title: "Chat Title",
      subtitle: "Chat Subtitle",
      date: new Date(),
      unread: 5,
    },
    // Add more chat items as needed
  ],
};

const Content = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <ChatList {...chatListProps} onClick={() => navigate("/user/chat/n931f9813fh9831f9")} />
      </div>

      <FooterLayout />
    </>
  );
};

export default Content;
