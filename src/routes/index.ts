import { Router } from "express";
import multer from "multer";
import { userLogin, userLogout, userRegister } from "../controllers/auth";

// Create a new Router instance
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Auth
router.post("/sign-up", userRegister);
router.post("/sign-in", userLogin);
router.post("/sign-out", userLogout);

export default router;
