// pages/api/getdata.js
import jwt from "jsonwebtoken";

const secretKey = "123456"; // Ganti dengan kunci rahasia yang kuat

const authMiddleware = handler => {
  return async (req, res) => {
    //   console.log(req);
    const token = (req.headers.authorization || "").split("Bearer ").at(1);
    console.log(token, "tsest");
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token not provided" });
    } else {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          //   console.error("Error decoding token:", err);
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
          // Token tidak valid atau terjadi kesalahan
        } else {
          // Token ber
          req.user = decoded;
          // console.log(decoded);
          return handler(req, res);
        }
      });
    }
  };
};

const data = [
  { id: 1, text: "Selamat kamu telah berhasil login" },
  { id: 2, text: "Dan kamu berhasil get data dengan bearer" },
  // ... tambahkan data lainnya
];

const getDataHandler = (req, res) => {
  console.log(req.user);
  const username = req.user.username;
    res.status(200).json({ data: data, user:username });
};

export default authMiddleware(getDataHandler);
