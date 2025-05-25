"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// to compare user input password and hashed password from db
const comparePasswords = (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
// to hash the password before store it into db
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
// creating the jwt
const createJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
// middleware to protect the route
const protect = (req, res, next) => {
    const bearer = req.headers.authorization; // to verify that user sent a token
    // not sent the token or not authorized
    if (!bearer) {
        res.status(401);
        res.json({ message: "Not authorized" });
        return;
    }
    // only take the token from "Bearer aklsdlaksdj"
    const [, token] = bearer.split(" ");
    // maybe the token is empty
    if (!token) {
        res.status(401);
        res.json({ message: "Token invalid" });
        return;
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401);
        res.json({ message: "Token invalid" });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map