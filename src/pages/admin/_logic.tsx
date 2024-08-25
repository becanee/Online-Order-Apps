import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { baseAPIUrl } from "../../utils";

const Index = () => {
  const [loading, setLoading] = useState<any>(false);
  const [userdatas, setUserDatas] = useState<any>([]);
  const [productdata, setProductData] = useState<any>({});

  const getUsersByRole = async (role: string) => {
    setLoading(true);
    const response: any = await axios.get(`${baseAPIUrl}/api/users/${role}`);

    if (response?.data?.status) {
      setUserDatas(response.data.data);
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


  const getProductByMrcID = async (mrc_id: string) => {
    setLoading(true);
    const response: any = await axios.get(
      `${baseAPIUrl}/api/product/merchant/${mrc_id}`
    );

    if (response?.data?.status) {
      setProductData(response.data.data);
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
    if (userdatas?.length === 0) {
      getUsersByRole("merchant");
    }
  }, []);

  return {
    getUsersByRole,
    getProductByMrcID,
    setLoading,
    loading,
    userdatas,
    productdata,
  };
};

export default Index;
