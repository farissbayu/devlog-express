"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.createNewUser = void 0;
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../modules/auth");
// handler for create new user
const createNewUser = async (req, res) => {
    const user = await db_1.default.user.create({
        data: {
            username: req.body.username,
            password: await (0, auth_1.hashPassword)(req.body.password),
        },
    });
    const token = (0, auth_1.createJWT)(user);
    res.json({ token });
};
exports.createNewUser = createNewUser;
// handler for sign in
const signin = async (req, res) => {
    const user = await db_1.default.user.findUnique({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        res.status(401);
        res.json({ message: "User not found!" });
        return;
    }
    const isValid = await (0, auth_1.comparePasswords)(req.body.password, user.password);
    if (!isValid) {
        res.status(401);
        res.json({ message: "Wrong password, try again!" });
        return;
    }
    const token = (0, auth_1.createJWT)(user);
    res.json({ token });
};
exports.signin = signin;
//# sourceMappingURL=user.js.map