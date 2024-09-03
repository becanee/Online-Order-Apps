import axios from "axios";
import { useState } from "react";
import { baseAPIUrl } from "../../../utils";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const [loading, setLoading] = useState<any>(false);
  const [datas, setDatas] = useState<any>({});
  const [product, setProduct] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);
  const [inputData, setInputData] = useState<any>({});

  const getChatByID = async (id: any) => {
    // setLoading(true);
    const response: any = await axios.get(`${baseAPIUrl}/api/chat/${id}`);

    if (response?.data?.status) {
      setDatas(response.data.data);
    } else {
      toast.error(response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  const getProductByID = async (id: any) => {
    setLoading(true);
    const response: any = await axios.get(`${baseAPIUrl}/api/product/${id}`);

    if (response?.data?.status) {
      setProduct(response.data.data);
    } else {
      toast.error(response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  const getMessageByChatID = async (id: any) => {
    // setLoading(true);
    const response: any = await axios.get(
      `${baseAPIUrl}/api/chat/message/room/${id}`
    );

    if (response?.data?.status) {
      setMessages(response.data.data);
    } else {
      toast.error(response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  const sendMessageUser = async (params?: any) => {
    setLoading(true);

    let refactorData: any = {
      chat_id: params?.id,
      order_id: params?.order?.id,
      mrc_id: params?.merchant?.id,
      user_id: params?.buyer?.id,
      position: "right",
      type: "text",
      title: params?.buyer?.username,
      text: inputData?.text,
      date: new Date(),
      status: "received", // Example status (could be "sent", "delivered", "read", etc.)
      sender: "user",
      product_id: params?.product?.id,
    };
    const response: any = await axios.post(
      `${baseAPIUrl}/api/chat/messages/send`,
      refactorData
    );

    if (response?.data?.status) {
      setInputData({ text: null });
      getMessageByChatID(params?.id);
    } else {
      toast.error(response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  const createOrderByID = async (params: any) => {
    setLoading(true);

    const fd: any = {
      user_id: datas?.buyer?.id,
      mrc_id: datas?.merchant?.id,
      product_id: datas?.product?.id,
      order_product: datas?.product?.name,
      price: datas?.product?.price,
      rating: 0,
      feedback: "",
    };

    const createNewOrder: any = await axios.post(`${baseAPIUrl}/api/order`, fd);

    if (createNewOrder?.data?.status) {
      await getChatByID(params?.id);
      await getMessageByChatID(params?.id);

      const updateChatOrderID: any = await axios.post(
        `${baseAPIUrl}/api/chat/update/${params?.id}`,
        { order_id: createNewOrder?.data?.data?.id }
      );

      if (updateChatOrderID?.data?.status) {
        let refactorData: any = {
          chat_id: params?.id,
          order_id: createNewOrder?.data?.data?.id,
          mrc_id: params?.merchant?.id,
          user_id: params?.buyer?.id,
          position: "right",
          type: "meeting",
          title: params?.buyer?.username,
          text: inputData?.text,
          date: new Date(),
          status: "received", // Example status (could be "sent", "delivered", "read", etc.)
          sender: "system",
          product_id: params?.product?.id,
        };
        const response2nd: any = await axios.post(
          `${baseAPIUrl}/api/chat/messages/send`,
          refactorData
        );

        if (response2nd?.data?.status) {
          setInputData({ text: null });
          await getMessageByChatID(response2nd.data.data?.chat_id);
        } else {
          toast.error(response2nd?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    } else {
      toast.error(createNewOrder?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setLoading(false);
  };

  return {
    getChatByID,
    getProductByID,
    sendMessageUser,
    setLoading,
    setInputData,
    getMessageByChatID,
    createOrderByID,
    inputData,
    loading,
    datas,
    product,
    messages,
  };
};

export default Index;
