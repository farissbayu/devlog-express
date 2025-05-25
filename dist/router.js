"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * Product
 */
router.get("/product", (req, res) => {
    res.json({ message: "hello from get product" });
});
router.get("/product/:id", () => { });
router.post("/product", () => { });
router.put("/product/:id", () => { });
router.delete("/product/:id", () => { });
/**
 * Update
 */
router.get("/update", () => { });
router.get("/update/:id", () => { });
router.post("/update", () => { });
router.put("/update/:id", () => { });
router.delete("/update/:id", () => { });
/**
 * Update point
 */
router.get("/updatepoint", () => { });
router.get("/updatepoint/:id", () => { });
router.post("/updatepoint", () => { });
router.put("/updatepoint/:id", () => { });
router.delete("/updatepoint/:id", () => { });
exports.default = router;
//# sourceMappingURL=router.js.map