import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalUser from "./ModalUser";

const CardUser = ({ data }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card maxW="full" onClick={onOpen}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={data?.username}
                src={data?.avatar ? data?.avatar : ""}
              />

              <Box>
                <Heading size="sm">{data?.username}</Heading>
                <Text>{data?.phone_number}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
      </Card>

      <ModalUser isOpen={isOpen} data={data} onClose={onClose} />
    </>
  );
};

export default CardUser;
