import { Avatar } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import NavbarDrawer from "./NavbarDrawer";
import { useNavigate } from "react-router-dom";

export const NavbarLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="border-gray-200" style={{ backgroundColor: "#5DB329" }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
          <NavbarDrawer />

          <a
            href="/"
            className="flex justify-center items-center -ml-[7rem]"
          >
            <HiLocationMarker className="text-white size-6 m-auto mr-2" />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
              Bandung
            </span>
          </a>
          <div
            className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
            onClick={() => navigate("/profiles")}
          >
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </div>
        </div>
      </nav>
    </>
  );
};
