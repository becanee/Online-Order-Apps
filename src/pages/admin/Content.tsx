import {
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { getUserData } from "../../utils";
import { NavbarLayout } from "../../layouts/NavbarLayout";
import CardUser from "./_components/CardUser";
import useLogic from "./_logic";

const Index = () => {
  const userProfile: any = getUserData();
  const { getUsersByRole, loading, userdatas } = useLogic();

  return (
    <>
      <NavbarLayout />

      <div className="px-2 -mt-5">
        <div className="px-6 mt-10">
          <p className="text-2xl font-semibold">
            Hai {userProfile?.username} !
          </p>
          <p className="text-lg text-muted">Berikut Data Pengguna</p>
        </div>

        <Tabs
          variant="soft-rounded"
          borderRadius={1}
          className="mt-8"
          colorScheme="green"
        >
          <TabList>
            <Tab onClick={() => getUsersByRole("merchant")}>Merchant Data</Tab>
            <Tab onClick={() => getUsersByRole("user")}>User Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="grid grid-cols-2 gap-2">
                {loading ? (
                  <>
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                  </>
                ) : (
                  userdatas.map((item: any, key: any) => {
                    return <CardUser key={key} data={item} />;
                  })
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-2 gap-2">
                {loading ? (
                  <>
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                    <Skeleton mt={3} height="170px" />
                  </>
                ) : (
                  userdatas.map((item: any, key: any) => {
                    return <CardUser key={key} data={item} />;
                  })
                )}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default Index;
