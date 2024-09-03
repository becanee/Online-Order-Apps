import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPIUrl, getUserData } from "../../../utils";
import { Bounce, toast } from "react-toastify";

const Index = () => {
  const userProfile: any = getUserData();
  const [loading, setLoading] = useState<any>(true);
  const [datas, setDatas] = useState<any>({});

  const getChatByUserID = async () => {
    setLoading(true);
    let refactorDatas: any = [];
    const response: any = await axios.get(
      `${baseAPIUrl}/api/chats/${userProfile?.id}`
    );

    if (response?.data?.status) {
      response.data.data?.map((i: any) => {
        refactorDatas.push({
          id: i?.id,
          avatar: i?.merchant?.avatar,
          alt: "User Avatar",
          title: i?.merchant?.username,
          subtitle: `Penjual ${i?.product?.name}`,
          date: i?.updated_at,
          unread: 0,
        });
      });

      setDatas(refactorDatas);
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
    getChatByUserID();
  }, []);

  return {
    setLoading,
    loading,
    datas,
  };
};

export default Index;
