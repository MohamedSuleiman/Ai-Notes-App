import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import token from "../models/token.js";
import user from "../models/user.js";
dotenv.config();

// can do better her i.e by splitting up the method and using SOLID principles,
// but time-constricted for now
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "username or password was wrong" });
    }
    const matchingPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!matchingPassword) {
      return res
        .status(401)
        .json({ errorMessage: "username or password was wrong" });
    }

    const payload = { sub: user._id };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(
      { sub: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    const saveRefreshToken = new token({
      refreshToken: hashedToken,
      user: user._id,
      expiresAt: Date.now() + sevenDays,
    });
    await saveRefreshToken.save();

    res.cookie("refreshToken", `${refreshToken}:${saveRefreshToken._id}`, {
      httpOnly: true,
      secure: true,
      path: "/refresh",
    });

    res.status(200).json({ accessToken: token });
  } catch (e) {
    res.status(500).json({ errorMessage: "Server error" });
  }
}

export async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(409).json({ errorMessage: "Username in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      hashedPassword: hashedPassword,
    });

    await newUser.save();
    console.log(`Saved a new user: `);
  } catch (err) {
    console.error(err);
  }
}

export async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const tokenId = refreshToken.split(":")[1];
  const dbRefreshToken = await token.findOne({ _id: tokenId });
  if (!dbRefreshToken) return res.sendStatus(401);
  const matching = await bcrypt.compare(
    refreshToken.split(":")[0],
    dbRefreshToken
  );
  if (!matching) return res.sendStatus(401);

  if (dbRefreshToken.expiresAt < Date.now()) {
    return res.sendStatus(401);
  }

  const user = dbRefreshToken.user;
  const newToken = jwt.sign({ user }, process.env.ACCESS_REFRESH_SECRET, {
    expiresIn: "10m",
  });
  res.json({ accessToken: newToken });
}
