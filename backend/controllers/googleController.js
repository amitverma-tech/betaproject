import admin from "../firebaseAdmin.js";
import User from "../models/userModel.js";

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const name = decoded.name;
    const photo = decoded.picture;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        photo,
      });
      await user.save();
    }

    res.json({
      message: "Google login successful",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Google login failed", details: error });
  }
};
