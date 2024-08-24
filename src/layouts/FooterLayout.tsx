import { HiChatAlt2, HiClipboardList, HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const FooterLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer
        className="fixed m-auto bottom-0 left-0 z-20 w-full p-2 max-h-[4rem] md:flex md:items-center md:justify-between"
        style={{ backgroundColor: "#5DB329" }}
      >
        <div className="grid grid-cols-3">
          <div
            className="grid grid-rows-2"
            onClick={() => navigate("/user")}
          >
            <HiHome className="m-auto size-8 text-white" />
            <p className="text-[12px] justify-self-center text-white">
              Beranda
            </p>
          </div>
          <div
            className="grid grid-rows-2"
            onClick={() => navigate("/user/chats")}
          >
            <HiChatAlt2 className="m-auto size-8 text-white" />
            <p className="text-[12px] justify-self-center text-white">Pesan</p>
          </div>
          <div
            className="grid grid-rows-2"
            onClick={() => navigate("/user/history")}
          >
            <HiClipboardList className="m-auto size-8 text-white" />
            <p className="text-[12px] justify-self-center text-white">
              Riwayat
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterLayout;
