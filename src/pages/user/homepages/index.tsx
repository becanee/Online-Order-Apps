import Content from "./Content";
import Cookies from "js-cookie";

const HomepagesUser = () => {
  const checkUser: any = Cookies.get("_TOKEN");
  if (!checkUser) window.location.replace("/");

  return <Content />;
};

export default HomepagesUser;
