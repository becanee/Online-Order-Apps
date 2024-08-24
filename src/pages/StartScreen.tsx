import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const StartScreen = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-2xl font-bold text-gray-900 ml-[2rem] mt-8">
        <p className="pt-4">Siap Untuk Mendukung</p>
        <p className="mb-16 lg:mb-10">Kegiatan anda hari ini</p>
      </div>

      <div className="flex justify-center items-center -mt-[4rem]">
        <img src="/assets/images/bg-gradient.png" className="" alt="" />
      </div>

      <div className="flex justify-center items-center m-auto w-[12rem] -mt-[19rem]">
        <img src="/assets/images/start-screen.png" className="" alt="" />
      </div>

      <div className="ml-[2rem] mt-[6rem] text-xl text-gray-900">
        <p>Selamat datang!</p>
        <p>Apakah anda Pedagang atau Pengguna?</p>
      </div>

      <div className="flex mt-20 lg:mt-14 justify-center items-center">
        <ButtonGroup variant="solid" spacing={-2}>
          <Button
            size="lg"
            colorScheme="whatsapp"
            variant="solid"
            borderLeftRadius={20}
            onClick={() => navigate("/merchant/start")}
          >
            Pedagang
          </Button>
          <Button
            size="lg"
            colorScheme="whatsapp"
            variant="solid"
            borderRightRadius={20}
            onClick={() => navigate("/user/start")}
          >
            Pengguna
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
