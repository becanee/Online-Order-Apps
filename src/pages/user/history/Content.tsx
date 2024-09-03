import {
  Button,
  Card,
  Image,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FooterLayout from "../../../layouts/FooterLayout";
import useLogic from "./_logic";
import { RiCloseCircleFill, RiTimerFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useState } from "react";
import ModalHistory from "./_components/ModalHistory";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { ToastContainer } from "react-toastify";
import { IoStarSharp } from "react-icons/io5";

const Content = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { checkOrderByProductID, handleAddRating, loading, datas } = useLogic();
  const [detail, setDetail] = useState<any>({});

  const handleChat = async () => {
    const res: any = await checkOrderByProductID();

    if (res !== undefined) {
      navigate(`/user/chat/${res}`);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 mt-5">
        {loading ? (
          <>
            <Skeleton mt={3} height="130px" mx={2} />
            <Skeleton mt={3} height="130px" mx={2} />
            <Skeleton mt={3} height="130px" mx={2} />
            <Skeleton mt={3} height="130px" mx={2} />
            <Skeleton mt={3} height="130px" mx={2} />
            <Skeleton mt={3} height="130px" mx={2} />
          </>
        ) : !loading && datas?.length > 0 ? (
          <>
            {datas?.map((item: any, key: any) => {
              return (
                <Card
                  className="mx-4 my-2 rouded-2xl px-2 drop-shadow-md shadow-md"
                  key={key}
                >
                  <Text px="3" mt={4} fontSize="sm">
                    {moment(item?.updated_at)
                      .tz("Asia/Jakarta")
                      .format("DD MMM, HH:mm")}
                  </Text>

                  <div className="flex mb-4">
                    <Image
                      objectFit="cover"
                      rounded={10}
                      className="mt-2 ml-2"
                      w={24}
                      h={24}
                      src={item?.product?.picture}
                      alt="Caffe Latte"
                      onClick={() => {
                        setDetail(item);
                        onOpen();
                      }}
                    />

                    <div
                      className="mt-1 w-full"
                      onClick={() => {
                        setDetail(item);
                        onOpen();
                      }}
                    >
                      <Text mb={4} px="3" fontSize="lg" as="b">
                        {item?.product?.name}
                      </Text>

                      <Text mt={1} px="3" fontSize="sm">
                        {item?.status === "proses" ? (
                          <>
                            <div className="flex">
                              <RiTimerFill
                                size={18}
                                className="mr-1 text-blue-400"
                              />{" "}
                              Pesanan sedang diproses
                            </div>
                          </>
                        ) : item?.status === "selesai" ? (
                          <>
                            <div className="flex">
                              <FaCheckCircle
                                size={16}
                                className="mr-1 text-green-400"
                              />{" "}
                              Selesai {item?.rating ? <> |<IoStarSharp size={20} className="text-yellow-500" /> {item?.rating}</> : null}
                            </div>
                          </>
                        ) : item?.status === "batal" ? (
                          <>
                            <div className="flex">
                              <RiCloseCircleFill
                                size={16}
                                className="mr-1 text-red-400"
                              />{" "}
                              Pesanan dibatalkan
                            </div>
                          </>
                        ) : null}
                      </Text>

                      <Text mt={1} px="3" fontSize="xs" className="flex">
                        <ImLocation size={30} className="mr-1 text-red-400" />
                        {item?.merchant?.address}
                      </Text>
                    </div>

                    <div className="block mt-1">
                      <Text mt={0} px="3" fontSize="md">
                        Rp{item?.product?.price?.toLocaleString("id")}
                      </Text>

                      {item?.status === "proses" ? (
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          size="sm"
                          className="top-9 ml-2"
                          onClick={() => handleChat()}
                        >
                          Chat
                        </Button>
                      ) : item?.status === "selesai" ? (
                        <>
                          {!item?.rating && !item?.feedback ? (
                            <Button
                              variant="solid"
                              colorScheme="yellow"
                              size="sm"
                              className="top-9 ml-2"
                              onClick={() => {
                                setDetail(item);
                                onOpen();
                              }}
                            >
                              Beri Rating
                            </Button>
                          ) : (
                            <Button
                              variant="solid"
                              colorScheme="whatsapp"
                              size="sm"
                              className="top-9 ml-2"
                              onClick={() =>
                                navigate(`/user/product/${item?.product.id}`)
                              }
                            >
                              Mau Lagi
                            </Button>
                          )}
                        </>
                      ) : item?.status === "batal" ? (
                        <Button
                          variant="solid"
                          colorScheme="teal"
                          size="sm"
                          className="top-9 ml-6"
                          onClick={() =>
                            navigate(`/user/product/${item?.product.id}`)
                          }
                        >
                          Pesan
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Card>
              );
            })}
          </>
        ) : datas?.length === 0 ? (
          <div className="px-5">
            <div
              id="alert-1"
              className="flex items-center p-4 mb-4 text-cyan-800 rounded-lg bg-cyan-50 dark:bg-cyan-800 dark:text-cyan-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div className="ms-3 text-sm font-medium">
                Sepertinya kamu belum mempunyai pesanan.
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <ModalHistory
        isOpen={detail?.status === "selesai" ? isOpen : false}
        data={detail}
        onClose={onClose}
        // getChatID={checkOrderByProductID}
        loading={loading}
        addRating={handleAddRating}
      />

      <ToastContainer />
      <FooterLayout />
    </>
  );
};

export default Content;
