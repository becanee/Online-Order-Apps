import {
  Button,
  Card,
  CardHeader,
  Image,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useLogic from "./_logic";
import { useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import ModalMerchant from "./_components/ModalMerchant";
import { ToastContainer } from "react-toastify";

const Content = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { id } = useParams();
  const {
    checkOrderByProductID,
    getProductByID,
    handlePalceOrder,
    loading,
    datas,
  } = useLogic();

  const handleOrder = async () => {
    const res: any = await checkOrderByProductID(datas?.id);

    if (res !== undefined) {
      navigate(`/user/chat/${res}`);
    } else {
      await handlePalceOrder();
    }
  };

  useEffect(() => {
    if (id) {
      getProductByID(id);
    }
  }, [id]);

  return (
    <>
      <div className="container px-10">
        <div className="-mt-[4rem] lg:-mt-[2rem]">
          <div className="flex justify-center items-center">
            <img src="/assets/images/bg-gradient.png" className="" alt="" />
          </div>

          <div className="flex justify-center items-center m-auto w-[24rem] -mt-[19rem]">
            <img src="/assets/images/user/items.png" className="" alt="" />
          </div>
        </div>
        <div className="-mt-10">
          <p className="text-xl font-semibold text-gray-900 mt-24 lg:mt-16">
            Mau pesan ini? <br />
            Ayo hubungi pedangang!
          </p>
        </div>

        {datas?.status === "libur" ? (
          <div
            className="p-4 mt-5 mb-4 text-red-900 border border-red-500 rounded-lg bg-red-200"
            role="alert"
          >
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Merchant Libur 😔</h3>
            </div>
            <div className="mt-2 mb-0 text-sm">
              Merchant sedang tidak bisa menerima pesanan saat ini
            </div>
          </div>
        ) : null}

        <div className="flex justify-between mt-5">
          {loading ? (
            <Skeleton mt={3} w={200} h={220} />
          ) : (
            <div className="grid grid-rows-2 gap-6 w-48">
              <div>
                <h1 className="text-2xl font-bold mb-5 text-[#3F3D56]">
                  {datas?.name}
                </h1>
                <p className="-mt-5">Rp {datas?.price?.toLocaleString("id")}</p>
                <h2 className="text-lg font-semibold mt-4 text-[#3F3D56]">
                  About this product
                </h2>
              </div>
              <p className="-mt-6">{datas?.desc}</p>
            </div>
          )}

          {loading ? (
            <Skeleton mt={3} w={130} h={130} />
          ) : (
            <Card
              borderRadius={20}
              className="relative grid h-[8rem] w-full max-w-[8rem] items-end justify-center overflow-hidden text-center"
            >
              <CardHeader
                boxShadow="md"
                color="transparent"
                className={`absolute inset-0 m-0 h-full w-full rounded-none`}
                style={{ background: "rgba(10, 10, 10, 0.88)" }}
              >
                <Image
                  src={datas?.picture}
                  alt={datas?.name}
                  opacity={0.5}
                  className="absolute inset-0 m-0 h-full w-full rounded-none"
                />
              </CardHeader>
            </Card>
          )}
        </div>

        <div className="mt-[1rem] lg:mt-[8rem] mb-4">
          <div className="flex justify-center">
            {loading ? (
              <Skeleton mt={3} w={200} h={8} />
            ) : (
              <>
                <p className="flex text-black self-start mr-10">
                  <RiShoppingBagLine size={20} className="text-green-500" />
                  Terjual {datas?.sold}x
                </p>
                <p className="flex text-black self-start">
                  <IoStarSharp size={20} className="text-yellow-500" />
                  Rating{" "}
                  {datas?.sold ? (datas?.rating / datas?.sold).toFixed(1) : "-"}
                </p>
              </>
            )}
          </div>

          <p
            className="flex justify-center mt-4 text-black self-center"
            onClick={onOpen}
          >
            {loading ? (
              <Skeleton mt={3} w={160} h={8} />
            ) : (
              <>
                <BsShop size={20} className="text-blue-500 mr-1" />
                Merchant info
              </>
            )}
          </p>
        </div>

        {datas?.status !== "libur" ? (
          <div className="flex justify-center drop-shadow-2xl shadow-2xl">
            <Button
              color="white"
              size="lg"
              w={300}
              bgColor={["#5DB329"]}
              variant="solid"
              borderRadius={25}
              onClick={handleOrder}
            >
              Contact Merchant
            </Button>
          </div>
        ) : null}
      </div>

      <ModalMerchant isOpen={isOpen} data={datas} onClose={onClose} />
      <ToastContainer />
    </>
  );
};

export default Content;
