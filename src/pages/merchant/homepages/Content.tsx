import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { NavbarLayout } from "../../../layouts/NavbarLayout";
import FooterLayout from "../../../layouts/FooterLayout";
import { HiOutlineSearch } from "react-icons/hi";
import CardProduct from "./_components/CardProduct";

const Index = () => {
  return (
    <>
      <NavbarLayout />

      <div className="px-8 -mt-5">
        <div className="mt-10">
          <p className="text-2xl font-semibold">Hai Mrc (Penjual) !</p>
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

        <div className="overflow-y-scroll h-[28rem] mt-2 mb-10">
          <div className="grid grid-cols-2 gap-4">
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
