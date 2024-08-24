import { Button, Card, CardBody, CardHeader, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container px-10">
        <div className="flex justify-center items-center">
          <img src="/assets/images/bg-gradient.png" className="" alt="" />
        </div>

        <div className="flex justify-center items-center m-auto w-[24rem] -mt-[19rem]">
          <img src="/assets/images/user/items.png" className="" alt="" />
        </div>
        <div className="-mt-10">
          <p className="text-xl font-semibold text-gray-900 mt-24 lg:mt-16 px-4">
            Mau pesan ini? <br />
            Ayo hubungi pedangang!
          </p>
        </div>
        <div className="flex justify-between mt-14">
          <div className="grid grid-rows-2 gap-6 w-48">
            <div>
              <h1 className="text-2xl font-bold mb-5 text-[#3F3D56]">Satee</h1>
              <h2 className="text-lg font-semibold text-[#3F3D56]">
                About this product
              </h2>
            </div>
            <p className="-mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
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
                src={`https://flowbite.com/docs/images/products/apple-watch.png`}
                alt="Dan Abramov"
                opacity={0.5}
                className="absolute inset-0 m-0 h-full w-full rounded-none"
              />
            </CardHeader>
            <CardBody className="m-auto py-14 px-6"></CardBody>
          </Card>
        </div>

        <div className="flex justify-center m-12 mt-[5rem] lg:mt-[8rem] drop-shadow-2xl shadow-2xl">
          <Button
            color="white"
            size="lg"
            w={300}
            bgColor={["#5DB329"]}
            variant="solid"
            borderRadius={25}
            onClick={() => navigate("/user/chat/n931f9813fh9831f9")}
          >
            Contact the seller
          </Button>
        </div>
      </div>
    </>
  );
};

export default Content;
