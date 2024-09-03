import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
} from "@chakra-ui/react";
import { NavbarLayout } from "../../../layouts/NavbarLayout";
import FooterLayout from "../../../layouts/FooterLayout";
import { HiOutlineSearch } from "react-icons/hi";
import CardProduct from "./_components/CardProduct";
import { getUserData } from "../../../utils";
import useLogic from "./_logic";
import { useState } from "react";

const Index = () => {
  const userProfile: any = getUserData();
  const { setLoading, setDatasFiltered, datasFiltered, loading, datas } =
    useLogic();
  const [fltrd, setfltrd] = useState<any>("");

  const handleSearch = async (e: any) => {
    setLoading(true);
    const filteredData = datas.filter((el: any) => {
      if (e === "") {
        return el;
      } else {
        return el.name.toLowerCase().includes(e);
      }
    });

    setDatasFiltered(filteredData);
    setLoading(false);
  };

  const handleFilter = async (e: any) => {
    setLoading(true);
    setfltrd(e);
    const filteredData: any = datas.filter((el: any) => {
      if (e === "all") {
        return el;
      } else {
        return el.type.toLowerCase().includes(e);
      }
    });

    setDatasFiltered(filteredData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
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
            onChange={(e) => handleSearch(e.target.value)}
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
              onClick={() => handleFilter("all")}
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
              onClick={() => handleFilter("barang")}
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
              onClick={() => handleFilter("jasa")}
            >
              Jasa
            </Button>
          </ButtonGroup>
        </div>

        <div className="overflow-y-scroll h-[28rem] mt-2 mb-10">
          {datasFiltered?.length === 0 && fltrd && !loading ? (
            <div
              className="p-4 mt-5 mb-4 text-yellow-900 border border-yellow-500 rounded-lg bg-yellow-200"
              role="alert"
            >
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Oppss 🤔</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                sepertinya produk dengan kategori <b>{fltrd?.toUpperCase()}</b>{" "}
                sedang tidak tersedia
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              <>
                <Skeleton mt={3} height="170px" />
                <Skeleton mt={3} height="170px" />
                <Skeleton mt={3} height="170px" />
                <Skeleton mt={3} height="170px" />
              </>
            ) : datasFiltered?.length >= 1 ? (
              datasFiltered.map((i: any, k: any) => {
                return (
                  <>
                    <CardProduct key={k} datas={i} />
                  </>
                );
              })
            ) : (
              datas?.map((item: any, key: any) => {
                return <CardProduct key={key} datas={item} />;
              })
            )}
          </div>
        </div>
      </div>

      <FooterLayout />
    </>
  );
};

export default Index;
