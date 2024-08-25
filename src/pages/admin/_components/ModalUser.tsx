import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Avatar,
} from "@chakra-ui/react";
import useLogic from "../_logic";
import { useEffect } from "react";

const ModalUser = ({ isOpen, onClose, data }: any) => {
  const { getProductByMrcID, loading, productdata } = useLogic();

  useEffect(() => {
    if (data?.id && data?.role === "merchant" && isOpen) {
      getProductByMrcID(data?.id);
    }
  }, [data, isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Avatar
              size="sm"
              name={data?.username}
              src={data?.avatar ? data?.avatar : ""}
              className="mr-2"
            />
            {data?.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input disabled={loading} defaultValue={data?.username} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input disabled={loading} defaultValue={data?.phone_number} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                disabled={loading}
                defaultValue={data?.address}
                height="20"
              />
            </FormControl>

            {data?.role === "merchant" ? (
              <>
                <div className="px-0 mt-5">
                  <p className="text-xl mb-4 text-muted">Data Produk</p>
                </div>

                <FormControl>
                  <FormLabel>Nama</FormLabel>
                  <Input disabled defaultValue={productdata?.name} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Jenis</FormLabel>
                  <Input disabled defaultValue={productdata?.type} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Harga</FormLabel>
                  <Input
                    disabled
                    defaultValue={`Rp ${productdata?.price?.toLocaleString(
                      "id"
                    )}`}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Deskripsi</FormLabel>
                  <Input
                    type="text"
                    disabled
                    defaultValue={productdata?.desc}
                    height="20"
                  />
                </FormControl>

                {productdata?.status === "pending" ? (
                  <>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={onClose}
                      mr={3}
                      isLoading={loading}
                    >
                      Decline
                    </Button>
                    <Button colorScheme="green" size="sm" isLoading={loading}>
                      Approve
                    </Button>
                  </>
                ) : null}
              </>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} isLoading={loading}>
              Cancel
            </Button>
            <Button colorScheme="blue" isLoading={loading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUser;
