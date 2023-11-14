import bcrypt from "bcryptjs";
import { Token, User } from "../../../models/index.js";
import { signRefreshToken, signAccessToken } from "../../../utils/index.js";

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json("Invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = signAccessToken(user._id);
      const refreshToken = signRefreshToken(user._id);

      const tokenEntity = new Token({
        access_token: accessToken,
        refresh_token: refreshToken,
        userId: user._id,
        expiresIn: 24 * 60 * 60,
        createdAt: Date.now(),
      });

      const savedToken = await tokenEntity.save();

      return res.status(200).json({
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 24 * 60 * 60,
        created_at: Date.now(),
      });
    } else {
      return res.status(404).json(responseHelper(2, "Invalid email or password"));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
