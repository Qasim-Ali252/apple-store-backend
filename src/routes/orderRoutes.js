import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyOrders, createOrder, getOrderById } from "../controllers/orderController.js";

const router = Router();

router.use(protect);
router.route("/").get(getMyOrders).post(createOrder);
router.get("/:orderId", getOrderById);

export default router;
