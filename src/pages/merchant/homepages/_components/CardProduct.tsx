import { Card, CardBody, CardHeader, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ datas }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        borderRadius={20}
        className="grid h-[20rem] w-full max-w-full items-end justify-center overflow-hidden text-center mt-2"
        onClick={() => navigate("/merchant/add-product")}
      >
        <CardHeader
          boxShadow="md"
          color="transparent"
          className={`absolute inset-0 m-0 h-full w-full rounded-none`}
          style={{ background: "rgba(10, 10, 10, 1.5)" }}
        >
          <Image
            src={datas?.picture}
            alt="Dan Abramov"
            opacity={0.5}
            className="absolute inset-0 m-0 h-full w-full rounded-none"
          />
        </CardHeader>
        <CardBody className="m-auto flex justify-between py-14 px-0">
          <Text className="relative text-white text-2xl mt-32">
            {datas?.name}
          </Text>
          <div className="flex">
            <p className="text-white self-start absolute bottom-6 left-2 text-[10px]">
              Mulai Dari
            </p>
            <p className="text-white self-start absolute bottom-2 left-2 text-[14px]">
              Rp. {datas?.price?.toLocaleString("id")}
            </p>
            {/* <div
              className={`text-md font-lg text-red rounded top-0 text-[14px]`}
            >
              {datas?.status?.toUpperCase()}
            </div> */}
          </div>
          <div className="flex justify-end">
            <p
              className={`text-white self-start absolute bottom-3 right-4 rounded-lg ${
                datas.status === "pending"
                  ? "p-1 bg-yellow-500"
                  : datas.status === "live"
                  ? "p-1 bg-green-500"
                  : datas.status === "libur"
                  ? "p-1 bg-red-500"
                  : null
              } text-[14px]`}
            >
              {datas?.status?.toUpperCase()}
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CardProduct;
