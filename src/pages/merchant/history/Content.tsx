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
import useLogic from "./_logic";
import moment from "moment-timezone";

const Content = () => {
  const { datas } = useLogic();

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-1"
        // onClick={() => navigate("/client/rating")}
      >
        <Card className="">
          <CardHeader>
            {datas?.length > 0
              ? datas?.map((item: any, key: any) => {
                  return (
                    <>
                      <Flex key={key} className={key === 0 ? "" :"mt-8"}>
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar
                            name={`Sateee`}
                            src={item?.product?.picture}
                          />

                          <Box>
                            <Heading size="sm">{item?.buyer?.username}</Heading>
                            <Text display={"flex"}>
                              {true ? (
                                <>
                                  {item?.rating ? (
                                    <>
                                      {item?.product?.name} |{" "}
                                      <IoStarSharp color="yellow" />{" "}
                                      {item?.rating} | {item?.feedback}
                                    </>
                                  ) : "Belum kasih rating"}
                                </>
                              ) : (
                                <div className="color-yellow">
                                  Belum Memberi Rating
                                </div>
                              )}
                              {/* {item?.rating !== 0
                              ? new Array(item.rating)?.map(() => {
                                  return <IoStarSharp color="yellow" />;
                                })
                              : null} */}
                            </Text>
                          </Box>
                        </Flex>
                        <Text ml={0}>
                          {moment(item?.updated_at)
                            .tz("Asia/Jakarta")
                            .format("DD MMM, HH:mm")}
                        </Text>
                      </Flex>
                    </>
                  );
                })
              : null}
          </CardHeader>
        </Card>
      </div>

      <FooterLayout />
    </>
  );
};

export default Content;
