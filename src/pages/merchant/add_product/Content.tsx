import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import useLogic from "./_logic";
import { ToastContainer } from "react-toastify";

const Content = () => {
  const {
    setInputData,
    setFile,
    setFile2nd,
    inputData,
    setLoading,
    loading,
    handleAddProducts,
    file,
    datas,
  } = useLogic();

  async function handleChange(e: any) {
    setLoading(true);
    setFile(URL.createObjectURL(e.target?.files[0]));
    setFile2nd(e.target?.files[0]);
    setLoading(false);
  }

  return (
    <>
      <div className="container px-4">
        {datas?.id ? (
          <div
            className="flex p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-200"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>
              <span className="font-medium">Produk Detail</span>
              <ul className="mt-1.5 list-disc list-inside">
                <li>
                  <b>Status: </b>
                  {datas?.status?.toUpperCase()}
                </li>
                <li>
                  <b>Terjual: </b>
                  {datas?.sold}
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        {file || datas?.picture ? (
          <div className="flex justify-center mt-10 items-center">
            <Image
              boxSize="150px"
              objectFit="cover"
              src={file ? file : datas?.picture}
              borderRadius={10}
            />
          </div>
        ) : (
          <div className="flex justify-center mt-10 items-center">
            <Image
              boxSize="150px"
              objectFit="cover"
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvAnXgqD8WH2Z4NNEkQIwmuujboUOtoHeFKg&s`}
              borderRadius={10}
            />
          </div>
        )}
        <VStack spacing={4} className="mt-8">
          <FormControl>
            <FormLabel>Upload Gambar</FormLabel>
            <Input
              type="file"
              variant="unstyled"
              opacity={100}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nama Produk/Jasa</FormLabel>
            <Input
              type="text"
              disabled={loading}
              borderRadius={15}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
              defaultValue={datas?.name}
              boxShadow="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Harga</FormLabel>
            <Input
              type="number"
              disabled={loading}
              borderRadius={15}
              onChange={(e) =>
                setInputData({ ...inputData, price: +e.target.value })
              }
              defaultValue={datas?.price}
              boxShadow="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Kategori</FormLabel>
            <Select
              placeholder="Pilih Kategori"
              disabled={loading}
              onChange={(e) =>
                setInputData({ ...inputData, type: e.target.value })
              }
              defaultValue={datas?.type}
              borderRadius={15}
              boxShadow="md"
            >
              <option value="barang">Produk</option>
              <option value="jasa">Jasa</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Deskripsi</FormLabel>
            <Input
              type="text"
              disabled={loading}
              borderRadius={15}
              onChange={(e) =>
                setInputData({ ...inputData, desc: e.target.value })
              }
              defaultValue={datas?.desc}
              boxShadow="md"
              height="20"
            />
          </FormControl>
          <div className="mt-5">
            <Button
              color="white"
              size="lg"
              w={300}
              bgColor={["#5DB329"]}
              variant="solid"
              borderRadius={20}
              isLoading={loading}
              loadingText="Please wait..."
              onClick={handleAddProducts}
            >
              Simpan Perubahan
            </Button>
          </div>
        </VStack>
      </div>

      <ToastContainer />
    </>
  );
};

export default Content;
