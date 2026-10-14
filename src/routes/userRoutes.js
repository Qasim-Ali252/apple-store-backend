import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { syncUser, getMe, updateMe } from "../controllers/userController.js";

const router = Router();

router.use(protect);
router.post("/sync", syncUser);
router.route("/me").get(getMe).put(updateMe);

export default router;
