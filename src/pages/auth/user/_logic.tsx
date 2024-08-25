import axios from "axios";
import { useState } from "react";
import { baseAPIUrl, saveLoggedUser } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);

  const handleRegister = async () => {
    setLoading(true);
    const response: any = await axios.post(`${baseAPIUrl}/api/sign-up`, {
      ...inputData,
      role: "user",
    });

    if (response?.data?.status) {
      toast.success(`Register Successfully`, {
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
        navigate("/user/success-register");
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

  const handleLogin = async () => {
    setLoading(true);
    const response: any = await axios.post(
      `${baseAPIUrl}/api/sign-in`,
      inputData
    );

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
        navigate("/user");
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
    handleRegister,
    handleLogin,
    inputData,
    loading,
  };
};

export default Index;
