import axios from "axios";
import { useState } from "react";
import { baseAPIUrl, saveLoggedUser } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);

  const handleLogin = async () => {
    setLoading(true);
    const response: any = await axios.post(`${baseAPIUrl}/api/sign-in`, {
      ...inputData,
      pathname: pathname,
    });

    if (response?.data?.status) {
      saveLoggedUser(response?.data?.data);
      toast.success(`Welcome !`, {
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
        navigate("/admin");
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

  return {
    setInputData,
    handleLogin,
    inputData,
    loading,
  };
};

export default Index;
