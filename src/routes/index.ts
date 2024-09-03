import { Router } from "express";
import multer from "multer";
import { userLogin, userLogout, userRegister } from "../controllers/auth";
import { addProduct } from "../controllers/products/add";
import { getUserByRole } from "../controllers/users";
import { getLiveProducts, getProductByMrcID, getProductID, getProducts } from "../controllers/products";
import { addRatingByOrderID, createUserChatAfterOrder, createUserOrder, getOrderByID, getOrderByMrcID, getOrderByProductID, getOrderByUserID, updateOrderByID } from "../controllers/orders"
import { getChatByID, getChatByMrcID, getChatByOrderID, getChatByProductID, getChatByUserID, getMessageByChatID, sendMessage, updatechatByID } from "../controllers/chats";

// Create a new Router instance
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Auth
router.post("/sign-up", userRegister);
router.post("/sign-in", userLogin); 
router.post("/sign-out", userLogout);

//  Users
router.get("/users/:role", getUserByRole);

// Products
router.post("/product/add", upload.single("file"), addProduct);
router.get("/products", getProducts);
router.get("/products/live", getLiveProducts);
router.get("/product/:id", getProductID);
router.get("/product/merchant/:mrc_id", getProductByMrcID);

// Orders
router.post("/order", createUserOrder);
router.post("/order/chat", createUserChatAfterOrder);
router.get("/order/by-id/:id", getOrderByID);
router.get("/order/:product_id", getOrderByProductID);
router.get("/order/by-userid/:user_id", getOrderByUserID);
router.get("/order/by-userid/:user_id", getOrderByUserID);
router.get("/order/by-mrcid/:mrc_id", getOrderByMrcID);
router.post("/order/update/by-id/:id", updateOrderByID);
router.post("/order/rating/by-orderid/:id", addRatingByOrderID);

// Chats
router.get("/chat/:id", getChatByID);
router.post("/chat/update/:id", updatechatByID);
router.get("/chats/:user_id", getChatByUserID);
router.get("/chats/mrc/:mrc_id", getChatByMrcID);
router.get("/chat/by-orderid/:order_id", getChatByOrderID);
router.get("/chat/by-productid/:product_id", getChatByProductID);
router.get("/chat/messages/:chat_id", getChatByID);
router.post("/chat/messages/send", sendMessage);
router.get("/chat/message/room/:chat_id", getMessageByChatID);

export default router;
