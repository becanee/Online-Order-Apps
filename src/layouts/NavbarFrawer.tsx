import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineReply, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const NavbarFrawer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  return (
    <>
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white"
        ref={btnRef}
        onClick={onOpen}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User (Pembeli)</DrawerHeader>

          <DrawerBody>
            <div className="grid grid-rows-2 gap-1 mt-64">
              <div
                className="flex justify-normal items-center"
                onClick={() => navigate("/user/profiles")}
              >
                <HiOutlineUser className="size-6 mr-3" />
                <p className="text-2xl font-semibold">Profil Settings</p>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button size="sm" colorScheme="red">
              <HiOutlineReply
                className="size-4 mr-3"
                onClick={() => navigate("/")}
              />{" "}
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarFrawer;
