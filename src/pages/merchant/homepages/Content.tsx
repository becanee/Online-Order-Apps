import {
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
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const userProfile: any = getUserData();
  const { loading, datas } = useLogic();

  return (
    <>
      <NavbarLayout />

      <div className="px-8 -mt-5">
        <div className="mt-10">
          <p className="text-2xl font-semibold">
            Hai {userProfile?.username} !
          </p>
          <p className="text-lg text-muted">Mari tingkatkan penjualan Anda</p>
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
          {datas?.status === "pending" ? (
            <div
              className="flex items-center p-4 mt-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-300"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>
                Produkmu sedang di review oleh admin sebelum muncul di beranda
                pembeli.
              </div>
            </div>
          ) : null}

          {datas?.id ? (
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                <Skeleton mt={3} height="170px" />
              ) : (
                <CardProduct datas={datas} />
              )}
            </div>
          ) : (
            <div
              className="p-4 mt-5 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-300"
              role="alert"
            >
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Hallo 👋</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                sepertinya kamu belum mempunyai produk/jasa untuk kami
                promosikan
              </div>
              <div className="flex">
                <button
                  onClick={() => navigate("/merchant/add-product")}
                  className="text-white py-3 mt-3 bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
                >
                  Buat Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterLayout />
    </>
  );
};

export default Index;
