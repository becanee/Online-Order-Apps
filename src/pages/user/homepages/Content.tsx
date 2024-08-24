import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { NavbarLayout } from "../../../layouts/NavbarLayout";
import FooterLayout from "../../../layouts/FooterLayout";
import { HiOutlineSearch } from "react-icons/hi";
import CardProduct from "./_components/CardProduct";
import { getUserData } from "../../../utils";

const Index = () => {
  const userProfile: any = getUserData();

  return (
    <>
      <NavbarLayout />

      <div className="px-8 -mt-5">
        <div className="mt-10">
          <p className="text-2xl font-semibold">{userProfile?.username} !</p>
          <p className="text-lg text-muted">Mari kita cari pesanan Anda</p>
        </div>

        <InputGroup className="mt-10">
          <InputLeftElement pointerEvents="none">
            <HiOutlineSearch size={20} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Cari kebutuhan mu!"
            borderRadius={15}
            boxShadow="md"
            // onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        <div className="flex mt-8 lg:mt-14 justify-center items-center">
          <ButtonGroup variant="solid" spacing={-2}>
            <Button
              className="w-[30vw] lg:w-[9vw]"
              size="lg"
              colorScheme="whatsapp"
              variant="solid"
              borderLeftRadius={20}
              // onClick={() => handleFilter("all")}
            >
              Semua
            </Button>
            <Button
              className="w-[30vw] lg:w-[9vw] border-l-2 border-solid border-gray-200"
              size="lg"
              colorScheme="whatsapp"
              variant="solid"
              borderLeftRadius={0}
              borderRightRadius={0}
              // onClick={() => handleFilter("barang")}
            >
              Barang
            </Button>
            <Button
              className="w-[30vw] lg:w-[9vw] border-l-2 border-solid border-gray-200"
              size="lg"
              colorScheme="whatsapp"
              variant="solid"
              borderLeftRadius={0}
              borderRightRadius={20}
              // onClick={() => handleFilter("jasa")}
            >
              Jasa
            </Button>
          </ButtonGroup>
        </div>

        <div className="overflow-y-scroll h-[28rem] mt-2 mb-10">
          <div className="grid grid-cols-2 gap-4">
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </div>
        </div>
      </div>

      <FooterLayout />
    </>
  );
};

export default Index;
