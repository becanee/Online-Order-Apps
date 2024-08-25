import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPIUrl, getUserData } from "../../../utils";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const userProfile: any = getUserData();
  const [loading, setLoading] = useState<any>(false);
  const [datas, setDatas] = useState<any>({});

  const getProducts = async () => {
    setLoading(true);
    const response: any = await axios.get(
      `${baseAPIUrl}/api/product/merchant/${userProfile?.id}`
    );

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

  useEffect(() => {
    getProducts();
  }, []);

  return {
    setLoading,
    loading,
    datas,
  };
};

export default Index;
