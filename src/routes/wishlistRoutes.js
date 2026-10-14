import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getWishlist, toggleWishlist, clearWishlist } from "../controllers/wishlistController.js";

const router = Router();

router.use(protect);
router.route("/").get(getWishlist).delete(clearWishlist);
router.post("/:productId", toggleWishlist);

export default router;
