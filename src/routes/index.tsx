import { createBrowserRouter } from "react-router-dom";

// Root Pages
import ErrorPages from "../pages/ErrorPages";
import { StartScreen } from "../pages/StartScreen";
import Profiles from "../pages/profiles";

// Authentication
import StartUser from "../pages/auth/user/StartUser";
import SignInUser from "../pages/auth/user/SignInUser";
import SignUpUser from "../pages/auth/user/SignUpUser";
import StartMrc from "../pages/auth/merchant/StartMrc";
import SignInMrc from "../pages/auth/merchant/SignInMrc";
import SignUpMrc from "../pages/auth/merchant/SignUpMrc";
import SuccessMrc from "../pages/auth/merchant/SuccessMrc";
import SuccessUser from "../pages/auth/user/SuccessUser";

// User Pages
import HomepagesUser from "../pages/user/homepages";
import ProductUser from "../pages/user/item";
import ChatRoomUser from "../pages/user/chat_room";
import AllChatUser from "../pages/user/all_chat";
import HistoryUser from "../pages/user/history";

// Merchant Pages
import HomepagesMrc from "../pages/merchant/homepages";
import AllChatMrc from "../pages/merchant/all_chat";
import HistoryMrc from "../pages/merchant/history";
import AddProductMrc from "../pages/merchant/add_product";
import AdminSettings from "../pages/admin";
import SignInAdmin from "../pages/auth/admin/SignInAdmin";

export const router = createBrowserRouter([
  // start Screen
  {
    path: "/",
    element: <StartScreen />,
    errorElement: <ErrorPages />,
  },

  // Authentication Admin
  {
    path: "/admin/sign-in",
    element: <SignInAdmin />,
    errorElement: <ErrorPages />,
  },

  // Authentication Merchant
  {
    path: "/merchant/start",
    element: <StartMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/sign-in",
    element: <SignInMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/sign-up",
    element: <SignUpMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/success-register",
    element: <SuccessMrc />,
    errorElement: <ErrorPages />,
  },

  // Authentication User
  {
    path: "/user/start",
    element: <StartUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/sign-in",
    element: <SignInUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/sign-up",
    element: <SignUpUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/success-register",
    element: <SuccessUser />,
    errorElement: <ErrorPages />,
  },

  // User Pages
  {
    path: "/user",
    element: <HomepagesUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/product/:name",
    element: <ProductUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/chats",
    element: <AllChatUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/chat/:id",
    element: <ChatRoomUser />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/user/history",
    element: <HistoryUser />,
    errorElement: <ErrorPages />,
  },
  
  // Merchant Pages
  {
    path: "/merchant",
    element: <HomepagesMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/chats",
    element: <AllChatMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/history",
    element: <HistoryMrc />,
    errorElement: <ErrorPages />,
  },
  {
    path: "/merchant/add-product",
    element: <AddProductMrc />,
    errorElement: <ErrorPages />,
  },

  // Profile Pages
  {
    path: "/profiles",
    element: <Profiles />,
    errorElement: <ErrorPages />,
  },

  // Admin Settings Pages
  {
    path: "/admin",
    element: <AdminSettings />,
    errorElement: <ErrorPages />,
  },
]);
