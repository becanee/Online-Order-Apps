import { Card, CardBody, CardHeader, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ datas }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        borderRadius={20}
        className="grid h-[11rem] w-full max-w-[11rem] items-end justify-center overflow-hidden text-center mt-2"
        onClick={() => navigate(`/user/product/${datas?.id}`)}
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
        <CardBody className="m-auto py-14 px-6">
          <Text className="relative text-white text-2xl mt-11">
            {datas?.name}
          </Text>
          <div className="flex items-stretch ">
            <p className="text-white self-start absolute bottom-6 left-2 text-[10px]">
              Mulai Dari
            </p>
            <p className="text-white self-start absolute bottom-2 left-2 text-[14px]">
              Rp. {datas?.price?.toLocaleString("id")}
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CardProduct;
