import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPIUrl, getUserData } from "../../../utils";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const userProfile: any = getUserData();
  const [loading, setLoading] = useState<any>(false);
  const [datas, setDatas] = useState<any>([]);

  const checkOrderByProductID = async () => {
    setLoading(true);
    const response: any = await axios.get(
      `${baseAPIUrl}/api/chats/${userProfile?.id}`
    );

    if (response?.data?.status) {
      setLoading(false);
      return response?.data?.data[0]?.id;
    }
  };

  const getOrders = async () => {
    setLoading(true);
    const response: any = await axios.get(
      `${baseAPIUrl}/api/order/by-userid/${userProfile?.id}`
    );

    if (response?.data?.status) {
      setDatas(
        response.data.data?.filter(
          (stat: any) =>
            stat?.status !== "pending" ||
            stat?.status === "proses" ||
            stat?.status === "selesai" ||
            stat?.status === "batal"
        )
      );
    } else {
      toast.info(`Kamu belum memiliki prsanan`, {
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

  const handleAddRating = async (params: any) => {
    setLoading(true);
    // console.log("🚀 ~ handleAddRating ~ params:", params);

    const responseRating: any = await axios.post(
      `${baseAPIUrl}/api/order/rating/by-orderid/${params?.order_id}`,
      {
        rating: params?.rating,
        feedback: params?.feedback,
      }
    );

    if (responseRating?.data?.status) {
      getOrders();
      toast.success(`Terima kasih feedbacknya`, {
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

  useEffect(() => {
    getOrders();
  }, []);

  return {
    setLoading,
    checkOrderByProductID,
    handleAddRating,
    loading,
    datas,
  };
};

export default Index;
