import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleInputError } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", body("name").isString(), handleInputError, () => {});
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put("/product/:id", body("name").isString(), handleInputError, () => {});
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  () => {}
);
router.put(
  "/update/:id",
  body("title").isString(),
  body("body").isString(),
  oneOf([
    check("status").equals("IN_PROGRESS"),
    check("status").equals("SHIPPED"),
    check("status").equals("DEPRECATED"),
  ]),
  body("version").optional().isString(),
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updatedId").exists().isString(),
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
