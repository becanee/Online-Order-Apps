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
      position: "left",
      type: "text",
      title: params?.merchant?.username,
      text: inputData?.text,
      date: new Date(),
      status: "received", // Example status (could be "sent", "delivered", "read", etc.)
      sender: "merchant",
      product_id: params?.product?.id,
    };
    const response: any = await axios.post(
      `${baseAPIUrl}/api/chat/messages/send`,
      refactorData
    );

    if (response?.data?.status) {
      setInputData({ text: null });
      getMessageByChatID(response.data.data?.chat_id);
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

  const updateOrderByID = async (params: any) => {
    console.log("🚀 ~ updateOrderByID ~ params:", params)
    setLoading(true);

    const response: any = await axios.post(
      `${baseAPIUrl}/api/order/update/by-id/${params?.datas?.order?.id}`,
      {
        status: params?.status,
      }
    );

    if (response?.data?.status) {
      await getChatByID(params?.datas?.id);

      console.log(
        "🚀 ~ updateOrderByID ~ response.data.data:",
        response.data.data
      );
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

  return {
    getChatByID,
    getProductByID,
    sendMessageUser,
    setLoading,
    setInputData,
    getMessageByChatID,
    updateOrderByID,
    inputData,
    loading,
    datas,
    product,
    messages,
  };
};

export default Index;
