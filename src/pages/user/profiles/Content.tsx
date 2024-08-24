import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const Content = () => {
  return (
    <>
    <div className="container px-4">
      <div className="flex justify-center mt-10 items-center">
        <Image
          boxSize="100px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          //   alt={profileInfo?.username}
          borderRadius={10}
        />
      </div>
      <VStack spacing={4} className="mt-16">
        <FormControl>
          <FormLabel>Upload Gambar</FormLabel>
          <Input
            type="file"
            variant="unstyled"
            opacity={100}
            // onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nama Pengguna</FormLabel>
          <Input
            type="text"
            borderRadius={15}
            // onChange={(e) =>
            //   setInputData({ ...inputData, username: e.target.value })
            // }
            // defaultValue={profileInfo?.username}
            boxShadow="md"
          />
        </FormControl>
        {/* <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password'borderRadius={15} boxShadow='md'/>
                </FormControl> */}
        <FormControl>
          <FormLabel>Nomor Telefon</FormLabel>
          <Input
            type="text"
            borderRadius={15}
            // onChange={(e) =>
            //   setInputData({ ...inputData, phone_number: e.target.value })
            // }
            // defaultValue={profileInfo?.phone_number}
            boxShadow="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Kota</FormLabel>
          <Select disabled borderRadius={15} boxShadow="md">
            <option>Bandung</option>
            <option>Kepo</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Input
            type="text"
            borderRadius={15}
            // onChange={(e) =>
            //   setInputData({ ...inputData, address: e.target.value })
            // }
            // defaultValue={profileInfo?.address}
            boxShadow="md"
            height="20"
          />
        </FormControl>
        <div className="mt-14">
          <Button
            color="white"
            size="lg"
            w={300}
            bgColor={["#5DB329"]}
            variant="solid"
            borderRadius={20}
            isLoading={false}
            loadingText="Please wait..."
            // onClick={onSubmit}
          >
            Simpan Perubahan
          </Button>
        </div>
      </VStack>
    </div>
    </>
  );
};

export default Content;
