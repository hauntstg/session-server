const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user)
      return res
        .status(404)
        .json({ message: "Tài khoản hoặc mật khẩu không chính xác!" });

    req.session.userId = user._id;
    // req.session.save((err) => {
    //   if (err) {
    //     console.error("Session save error:", err);
    //     return res.status(500).json({ message: "Session error" });
    //   }
    //   console.log("Session sau khi lưu:", req.session);
    //   res.json({ message: "Logged in" });
    // });
    return res.json({ message: "Logged in" });
  } catch (error) {
    console.log(error);
  }
};

exports.getData = (req, res, next) => {
  if (req.session.userId) {
    return res.json({ loggedIn: true, userId: req.session.userId });
  }
  return res.status(401).json({ loggedIn: false });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Đã đăng xuất", loggedIn: false });
  });
};
