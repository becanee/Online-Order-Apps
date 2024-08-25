import { Router } from "express";
import multer from "multer";
import { userLogin, userLogout, userRegister } from "../controllers/auth";
import { addProduct, getProductByMrcID } from "../controllers/products/add";
import { getUserByRole } from "../controllers/users";

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
router.get("/product/merchant/:mrc_id", getProductByMrcID);

export default router;
