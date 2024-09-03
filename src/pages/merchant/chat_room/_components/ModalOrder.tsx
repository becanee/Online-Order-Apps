import {
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
  Textarea,
} from "@chakra-ui/react";

const ModalOrder = ({ isOpen, onClose, order, pembeli, handleOrder }: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Avatar
              size="sm"
              name={pembeli?.username}
              src={pembeli?.avatar ? pembeli?.avatar : ""}
              className="mr-2"
            />
            {pembeli?.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Alamat Pembeli</FormLabel>
              <Textarea disabled defaultValue={pembeli?.address} height="20" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              w="full"
              className="mt-2"
              colorScheme="whatsapp"
              size="sm"
              onClick={() => {
                handleOrder(
                  order?.status === "pending"
                    ? "proses"
                    : order?.status === "proses"
                    ? "selesai"
                    : null
                );
                onClose();
              }}
            >
              {order?.status === "pending"
                ? "Terima"
                : order?.status === "proses"
                ? "Selesaikan"
                : null}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalOrder;
