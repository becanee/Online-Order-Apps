import { Avatar, Box, IconButton } from "@chakra-ui/react";
import {
  HiMenu,
  HiOutlineArrowNarrowLeft,
  HiOutlinePhone,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-5">
        <Box
          bg="#FFFFFF"
          p={8}
          color="white"
          className="container flex text-dark justify-between items-center max-h-[0px]"
        >
          <div className="flex flex-between center">
            <IconButton
              colorScheme="transparant"
              aria-label="Search database"
              icon={<HiMenu className="size-8 m-auto" />}
              onClick={() => navigate("/user/chats")}
            />
            <HiOutlineArrowNarrowLeft
              size={20}
              color="black"
              className="-ml-10 mr-5 mt-3"
            />
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              className="mt-2"
              src="https://bit.ly/dan-abramov"
            />
            <div className="flex gap-1 ml-3 mt-1 text-black">
              <p className="text-1xl mt-2 font-semibold m-auto">Pedagang</p>
            </div>
          </div>
          <HiOutlinePhone
            size={20}
            color="black"
            onClick={() => window.open("tel:08123456789")}
            className="mt-2"
          />
        </Box>
      </div>
    </>
  );
};

export default Content;
