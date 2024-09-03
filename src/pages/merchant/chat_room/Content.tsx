import {
  Avatar,
  Box,
  Button,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { MeetingMessage, MessageBox, SystemMessage } from "react-chat-elements";
import {
  HiMenu,
  HiOutlineArrowNarrowLeft,
  HiOutlinePhone,
} from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import ModalOrder from "./_components/ModalOrder";
import useLogic from "./_logic";
import { useEffect } from "react";

const SystemMessageProps: any = {
  // Define your props here
};

const messageBoxProps: any = {
  // Define your props here
};

const MeetingMessageProps: any = {
  // Define your props here
};

const Content = () => {
  let { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    getChatByID,
    getProductByID,
    sendMessageUser,
    setInputData,
    getMessageByChatID,
    updateOrderByID,
    inputData,
    datas,
    product,
    loading,
    messages,
  } = useLogic();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    await sendMessageUser(datas);
  };

  const handleUpdateOrder = async (status: any) => {
    await updateOrderByID({ datas: datas, status: status });
    getMessageByChatID(datas?.id);
  };

  useEffect(() => {
    if (datas?.product?.id) {
      getProductByID(datas?.product?.id);
    }
    
    getMessageByChatID(id);
    getChatByID(id);
    
    // setInterval(() => {
      getMessageByChatID(id);
    // }, 3000);

    // setInterval(() => {
    //   navigate(0)
    // }, 30000);

  }, [id, datas?.order?.product_id, messages?.length]);
  return (
    <>
      <Box
        bg="#FFFFFF"
        p={8}
        color="white"
        className="container flex text-dark justify-between items-center max-h-[0px]"
      >
        <div className="flex flex-between center">
          <IconButton
            colorScheme="transparant"
            aria-label="Search database"
            icon={<HiMenu className="size-8 m-auto" />}
            onClick={() => navigate("/merchant/chats")}
          />
          <HiOutlineArrowNarrowLeft
            size={20}
            color="black"
            className="-ml-10 mr-5 mt-3"
          />
          <Avatar
            size="sm"
            name={datas?.buyer?.username}
            className="mt-2"
            src={datas?.buyer?.avatar}
          />
          <div className="flex gap-1 ml-3 mt-1 text-black">
            <p className="text-1xl mt-2 font-semibold m-auto">
              {datas?.buyer?.username}
            </p>
          </div>
        </div>
        <HiOutlinePhone
          size={20}
          color="black"
          onClick={() => window.open(`tel:${datas?.buyer?.phone_number}`)}
          className="mt-2"
        />
      </Box>

      <div className="h-screen overflow-y-auto overflow-x-hidden max-h-[47.5rem]">
        <SystemMessage
          {...SystemMessageProps}
          className="mt-2 mb-2"
          text={
            "Hati-hati penipuan! Mohon tidak bertransaksi bila merchant belum bertemu dengan anda dan tidak memberikan data pribadi kepada merchant. Tetap bertransaksi melalui aplikasi kami ya."
          }
        />

        {messages?.length > 0
          ? messages?.map((item: any, key: any) => {
              if (item?.sender === "system") {
                return (
                  <div className="max-w-screen ml-[2.5px] mt-2 -mb-4">
                    <MeetingMessage
                      {...MeetingMessageProps}
                      subject={
                        item?.order?.status === "pending"
                          ? `Pesanan Baru`
                          : item?.order?.status === "proses"
                          ? `Pesanan Diproses`
                          : item?.order?.status === "selesai"
                          ? `Pesanan Selesai`
                          : item?.order?.status === "batal"
                          ? `Pesanan Batal`
                          : null
                      }
                      title={item?.order?.status?.toUpperCase()}
                      date={new Date()}
                      dateString={new Date().toDateString}
                      collapseTitle={
                        item?.order?.status === "pending"
                          ? `Detail Pesanan`
                          : item?.order?.status === "proses"
                          ? `Detail Pesanan`
                          : item?.order?.status === "selesai"
                          ? `Detail Pesanan`
                          : item?.order?.status === "batal"
                          ? `Detail Pesanan`
                          : null
                      }
                      participants={[
                        {
                          id: "1",
                          title: "Detail Pesanan",
                        },
                      ]}
                      dataSource={[
                        {
                          id: "1",
                          avatar:
                            "https://as1.ftcdn.net/v2/jpg/03/87/42/46/1000_F_387424650_YqJr0ffJMK40D8098nbNa7rmh0wNlzM9.jpg",
                          message: `Rp ${item?.order?.price?.toLocaleString(
                            "id"
                          )}`,
                          title: item?.order?.order_product,
                          avatarFlexible: false,
                          date: item?.order?.updated_at,
                        },
                      ]}
                    />
                  </div>
                );
              } else {
                return (
                  <MessageBox
                    {...messageBoxProps}
                    key={key}
                    className="mt-2"
                    position={item?.sender === "user" ? "left" : "right"}
                    title={item?.title}
                    type={item?.type}
                    src={item?.src}
                    text={item.text}
                    date={item?.date}
                    titleColor={item?.titleColor}
                    status={item?.status}
                    notch
                  />
                );
              }
            })
          : null}
      </div>

      <footer
        className="fixed bottom-0 m-auto bottom-0 left-0 z-1 w-full p-2 max-h-[10rem] md:flex md:items-center md:justify-between"
        style={{ backgroundColor: "#E0E0E0" }}
      >
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            disabled={loading}
            variant="filled"
            placeholder="Enter message"
            defaultValue={inputData?.text}
            onChange={(e) =>
              setInputData({ ...inputData, text: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleSendMessage}
              isDisabled={!inputData?.text || loading}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          hidden={!datas?.order?.status}
          w="full"
          className="mt-2"
          colorScheme={
            datas?.order?.status == "pending"
              ? "whatsapp"
              : datas?.order?.status == "proses"
              ? "yellow"
              : "default"
          }
          size="sm"
          isLoading={loading}
          isDisabled={!product?.id}
          onClick={onOpen}
        >
          {datas?.order?.status == "pending"
            ? "Terima Pesanan"
            : datas?.order?.status == "proses"
            ? "Selesaikan Pesanan"
            : datas?.order?.status == "pending"
            ? "Terima Pesanan"
            : null}
        </Button>

        <Button
          hidden={datas?.order?.status !== "pending"}
          w="full"
          className="mt-2"
          colorScheme={"red"}
          size="sm"
          isLoading={loading}
          isDisabled={!product?.id}
          onClick={() => handleUpdateOrder("batal")}
        >
          {"Tolak Pesanan"}
        </Button>

        {/* <Button
          hidden
          w="full"
          className="mt-2"
          colorScheme={
            datas?.order?.status == "pending"
              ? "whatsapp"
              : datas?.order?.status == "proses"
              ? "telegram"
              : datas?.order?.status == "selesai"
              ? "whatsapp"
              : "whatsapp"
          }
          size="sm"
          isLoading={loading}
          isDisabled={
            !product?.id ||
            datas?.order?.status == "pending" ||
            datas?.order?.status == "proses"
          }
          onClick={onOpen}
        >
          {datas?.order?.status == "pending"
            ? "Terima Pesanan"
            : datas?.order?.status == "proses"
            ? "Selesaikan Pesanan"
            : datas?.order?.status == "selesai"
            ? "Pesan Lagi"
            : "Order"}
        </Button> */}
      </footer>

      <ModalOrder
        isOpen={isOpen}
        data={product}
        order={datas?.order}
        pembeli={datas?.buyer}
        onClose={onClose}
        handleOrder={handleUpdateOrder}
      />
    </>
  );
};

export default Content;
