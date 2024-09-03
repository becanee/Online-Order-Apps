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
  Textarea,
} from "@chakra-ui/react";

const ModalMerchant = ({ isOpen, onClose, data }: any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Avatar
              size="sm"
              name={data?.merchant?.username}
              src={data?.merchant?.avatar ? data?.merchant?.avatar : ""}
              className="mr-2"
            />
            {data?.merchant?.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tanggal Bergabung</FormLabel>
              <Input disabled defaultValue={data?.merchant?.created_at} />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Kota</FormLabel>
              <Input disabled defaultValue={data?.merchant?.city} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Alamat</FormLabel>
              <Textarea
                disabled
                defaultValue={data?.merchant?.address}
                height="40"
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMerchant;
