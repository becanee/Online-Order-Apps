import { ChatList, IChatListProps } from "react-chat-elements";
import FooterLayout from "../../../layouts/FooterLayout";
import { useNavigate } from "react-router-dom";
import useLogic from "./_logic";
import { Skeleton } from "@chakra-ui/react";

const chatListProps: IChatListProps = {
  id: "unique-chat-list-id",
  lazyLoadingImage: "path/to/lazy-loading-image.jpg",
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
  ],
};

const Content = () => {
  const navigate = useNavigate();
  const { loading, datas } = useLogic();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {loading ? <>
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
          <Skeleton mt={3} height="80px" mx={2} />
        </> : (
          <ChatList
            {...chatListProps}
            dataSource={datas}
            onClick={(e: any) => navigate(`/user/chat/${e?.id}`)}
          />
        )}
      </div>

      <FooterLayout />
    </>
  );
};

export default Content;
