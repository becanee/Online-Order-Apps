import axios from "axios";
import { useState } from "react";
import { saveLoggedUser } from "../../../utils";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<any>({});

  const handleRegister = async () => {
    const response: any = await axios.post(`http://el.local:2000/api/sign-up`, {
      ...inputData,
      role: "user",
    });

    if (response?.data?.status) {
      navigate("/user/success-register");
    }
  };

  const handleLogin = async () => {
    const response: any = await axios.post(
      `http://el.local:2000/api/sign-in`,
      inputData
    );

    if (response?.data?.status) {
      saveLoggedUser(response?.data?.data);
      navigate("/user");
    }
  };

  return {
    setInputData,
    handleRegister,
    handleLogin,
    inputData,
  };
};

export default Index;
