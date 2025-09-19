import jwt from "jsonwebtoken";
import token from "../models/token";
import bcrypt from "bcryptjs";
import user from "../models/user";
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedPayload) => {
    if (err) {
      res.statusStatus(403);
    }
    req.user = decodedPayload;
  });
  next();
}

