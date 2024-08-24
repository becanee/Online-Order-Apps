import FooterLayout from "../../../layouts/FooterLayout";

const Content = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <h1>ALL CHAT</h1>
        {/* <ChatList
          className=""
          onClick={(e) => onOpenChatRoom(e)}
          dataSource={chats}
        /> */}
      </div>

      <FooterLayout />
    </>
  );
};

export default Content;
