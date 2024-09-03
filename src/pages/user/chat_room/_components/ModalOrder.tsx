import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Avatar,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ModalOrder = ({ isOpen, onClose, data, handleOrder }: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Avatar
              size="sm"
              name={data?.merchant?.username}
              src={data?.picture ? data?.picture : ""}
              className="mr-2"
            />
            {data?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Harga</FormLabel>
              <Input
                disabled
                defaultValue={`Rp ${data?.price?.toLocaleString("id")}`}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Terjual</FormLabel>
              <Input disabled defaultValue={`${data?.sold}x`} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              w="full"
              className="mt-2"
              colorScheme="whatsapp"
              size="sm"
              onClick={() => {
                handleOrder();
                onClose();
              }}
            >
              Pesan Sekarang
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalOrder;
