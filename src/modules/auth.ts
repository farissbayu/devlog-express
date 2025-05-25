import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// to compare user input password and hashed password from db
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// to hash the password before store it into db
export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

// creating the jwt
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

// middleware to protect the route
export const protect = (req, res, next) => {
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
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Token invalid" });
    return;
  }
};
