import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IoStarSharp } from "react-icons/io5";
import FooterLayout from "../../../layouts/FooterLayout";

const Content = () => {
  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-1"
        // onClick={() => navigate("/client/rating")}
      >
        <Card className="">
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={`Sateee`} src="https://bit.ly/dan-abramov" />

                <Box>
                  <Heading size="sm">Sateee</Heading>
                  <Text display={"flex"}>
                    {true ? (
                      <>
                        <IoStarSharp color="yellow" /> 5
                      </>
                    ) : (
                      <div className="color-yellow">Belum Memberi Rating</div>
                    )}
                    {/* {item?.rating !== 0
                            ? new Array(item.rating)?.map(() => {
                                return <IoStarSharp color="yellow" />;
                              })
                            : null} */}
                  </Text>
                </Box>
              </Flex>
              {/* <Text ml={0}>14:17</Text> */}
            </Flex>
          </CardHeader>
        </Card>
      </div>

      <FooterLayout />
    </>
  );
};

export default Content;
