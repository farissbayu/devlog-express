"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./modules/auth");
const user_1 = require("./handlers/user");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log("hello from express");
    res.status(200);
    res.json({ message: "Hello" });
});
app.use("/api/v1", auth_1.protect, router_1.default);
app.post("/user", user_1.createNewUser);
app.post("/signin", user_1.signin);
exports.default = app;
//# sourceMappingURL=server.js.map