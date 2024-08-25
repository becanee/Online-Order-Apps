import {
  Avatar,
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
import {
  HiOutlinePlusCircle,
  HiOutlineReply,
  HiOutlineUser,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import useLogic from "./_logic";
import { ToastContainer } from "react-toastify";
import { getUserData } from "../utils";

const NavbarDrawer = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  const userProfile: any = getUserData();
  const { handleLogout, loading } = useLogic();

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
          <DrawerHeader>
            <Avatar
              className="mr-3"
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            {userProfile?.username}
          </DrawerHeader>

          <DrawerBody>
            {pathname === "/merchant" ? (
              <>
                <div className="grid grid-rows-2 gap-1 mt-64">
                  <div
                    className="flex justify-normal items-center"
                    onClick={() => navigate("/profiles")}
                  >
                    <HiOutlineUser className="size-6 mr-3" />
                    <p className="text-xl font-semibold">Profil Settings</p>
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-1 -mt-5">
                  <div
                    className="flex justify-normal items-center"
                    onClick={() => navigate("/merchant/add-product")}
                  >
                    <HiOutlinePlusCircle className="size-6 mr-3" />
                    <p className="text-xl font-semibold">Add Product</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-rows-2 gap-1 mt-64">
                <div
                  className="flex justify-normal items-center"
                  onClick={() => navigate("/profiles")}
                >
                  <HiOutlineUser className="size-6 mr-3" />
                  <p className="text-xl font-semibold">Profil Settings</p>
                </div>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button size="sm" colorScheme="red" onClick={handleLogout} isLoading={loading}>
              <HiOutlineReply className="size-4 mr-3" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ToastContainer />
    </>
  );
};

export default NavbarDrawer;
