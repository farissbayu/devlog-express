import { Router } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputError } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getUpdatePointById,
  getUpdatePoints,
  updateUpdatePoint,
} from "./handlers/updatepoint";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdateById);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  body("version").optional().isString(),
  handleInputError,
  createUpdate
);
router.put(
  "/update/:id",
  body("title").isString(),
  body("body").isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional().isString(),
  handleInputError,
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update point
 */
router.get("/updatepoint", getUpdatePoints);
router.get("/updatepoint/:id", getUpdatePointById);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updatedId").exists().isString(),
  createUpdatePoint
);
router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  updateUpdatePoint
);
router.delete("/updatepoint/:id", deleteUpdatePoint);

export default router;
