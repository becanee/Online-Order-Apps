import axios from "axios";
import { useState } from "react";
import { baseAPIUrl, getUserData } from "../../../utils";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const userProfile: any = getUserData();
  const [loading, setLoading] = useState<any>(false);
  const [datas, setDatas] = useState<any>({});

  const checkOrderByProductID = async (id: any) => {
    setLoading(true);
    const responseChat: any = await axios.get(
      `${baseAPIUrl}/api/chat/by-productid/${id}`
    );

    if (responseChat?.data?.data?.buyer?.id === userProfile?.id) {
      setLoading(false);
      return responseChat?.data?.data?.id;
    } else {
      return undefined;
    }
  };

  const getProductByID = async (id: any) => {
    setLoading(true);
    const response: any = await axios.get(`${baseAPIUrl}/api/product/${id}`);

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

  const handlePalceOrder = async () => {
    setLoading(true);

    toast.info(`Starting chat...`, {
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

    const responsechat: any = await axios.post(`${baseAPIUrl}/api/order/chat`, {
      product_id: datas?.id,
      order_id: null,
      avatar: datas?.merchant?.avatar,
      alt: userProfile?.id,
      title: datas?.merchant?.username,
      subtitle: "",
      user_id: userProfile?.id,
      mrc_id: datas?.merchant?.id,
    });

    if (responsechat?.data?.data?.id) {
      setTimeout(() => {
        navigate(`/user/chat/${responsechat?.data?.data?.id}`);
      }, 2000);
    }
    setLoading(false);
  };

  return {
    getProductByID,
    checkOrderByProductID,
    setLoading,
    handlePalceOrder,
    loading,
    datas,
  };
};

export default Index;
