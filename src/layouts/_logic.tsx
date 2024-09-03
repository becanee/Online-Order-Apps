import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { baseAPIUrl, getUserData } from "../utils";
import Cookies from "js-cookie";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<any>(false);
  const userProfile: any = getUserData();

  const handleLogout = async () => {
    setLoading(true);
    const response: any = await axios.post(`${baseAPIUrl}/api/sign-out`, {
      phone_number: userProfile?.phone_number,
    });

    if (response?.data?.status) {
      toast.success(response?.data?.message, {
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
        Cookies.remove("_TOKEN");
        Cookies.remove("_TOKEN");
        navigate("/");
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
    handleLogout,
    loading,
  };
};

export default Index;
