import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPIUrl, getUserData } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();
  const userProfile: any = getUserData();
  const [file, setFile] = useState<string | any>(undefined);
  const [file2nd, setFile2nd] = useState<string | any>(undefined);
  const [inputData, setInputData] = useState<any>({});
  const [datas, setDatas] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);

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

  const handleAddProducts = async (status?: any) => {
    setLoading(true);

    let formData: any = new FormData();
    if (file2nd) {
      formData.append("file", file2nd);
    }
    if (datas?.name && datas?.price) {
      formData.append("product_id", datas?.id);
    } else {
      formData.append("mrc_id", userProfile?.id);
    }
    formData.append("status", status ? status : datas?.status);
    formData.append("name", inputData?.name ? inputData?.name : datas?.name);
    formData.append("type", inputData?.type ? inputData?.type : datas?.type);
    formData.append("desc", inputData?.desc ? inputData?.desc : datas?.desc);
    formData.append(
      "price",
      inputData?.price ? inputData?.price : datas?.price
    );

    const response: any = await axios.post(
      `${baseAPIUrl}/api/product/add`,
      formData
    );

    if (response?.data?.status) {
      toast.success(`Save Product Successfully`, {
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

      setTimeout(() => {
        navigate("/merchant");
      }, 2000);
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
    setInputData,
    setFile,
    setFile2nd,
    handleAddProducts,
    inputData,
    loading,
    file,
    datas,
  };
};

export default Index;
