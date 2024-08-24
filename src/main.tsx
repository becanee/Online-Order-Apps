import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import "./index.css";
import "react-chat-elements/dist/main.css"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <div className="m-auto lg:max-w-sm overflow-hidden bg-gray-100 h-screen w-screen">
        <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  </StrictMode>
);
