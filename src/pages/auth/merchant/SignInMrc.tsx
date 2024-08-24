import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SignInMrc = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-center items-center -mt-[4.5rem]">
        <img src="/assets/images/bg-gradient.png" className="" alt="" />
      </div>

      <div className="flex justify-center items-center m-auto w-[24rem] -mt-[19rem]">
        <img src="/assets/images/merchant/sign-in.png" className="" alt="" />
      </div>

      <p className="text-lg font-bold text-center text-gray-900 mt-16 lg:mt-32">
        Selamat datang,
      </p>
      <p className="text-lg font-bold text-center mb-10 lg:mb-5 text-gray-900">
        kami sudah menunggu!
      </p>

      <div className="flex justify-center items-center">
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <HiOutlineUser size={24} />
              {/* <PhoneIcon color='gray.300' /> */}
            </InputLeftElement>
            <Input
              type="number"
              name="phone_number"
              disabled={false}
              //   onChange={(e) =>
              //     setInputData({ ...inputData, phone_number: e.target.value })
              //   }
              placeholder="Nomor Handphone"
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <HiOutlineLockClosed size={24} />
              {/* <PhoneIcon color='gray.300' /> */}
            </InputLeftElement>
            <Input
              type={show ? "text" : "password"}
              //   onChange={(e) =>
              //     setInputData({ ...inputData, password: e.target.value })
              //   }
              placeholder="Kata Sandi"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>

          <div className="flex justify-between pt-4 gap-24">
            <p onClick={() => navigate("/client/sign-up")}>Daftar</p>
            <p onClick={() => navigate("/client/sign-up")}>Lupa Password ?</p>
          </div>

          <div className="mt-10">
            {/* <Button color="white" size='lg' w={300} bgColor={['#5DB329']} variant='solid' borderRadius={20} onClick={() => navigate("/merchant/home")}>Masuk</Button> */}
            <Button
              color="white"
              size="lg"
              w={300}
              bgColor={["#5DB329"]}
              isLoading={false}
              loadingText="Please wait..."
              //   onClick={onSubmit}
              variant="solid"
              borderRadius={20}
            >
              Masuk
            </Button>
          </div>
        </VStack>
      </div>
    </>
  );
};

export default SignInMrc;
