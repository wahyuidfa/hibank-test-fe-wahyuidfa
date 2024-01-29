// pages/api/users.js
let users = [
  {
    id: "1706508491619",
    fullname: "Wahyu Idfa Daru",
    email: "wahyu@idfa.com",
    birthdate: "13-13-1913",
    phone: "08212345678",
    age: "101",
  },
  {
    id: "1706508491620",
    fullname: "Wahyu Idfa",
    email: "wahyu@ni.com",
    birthdate: "13-13-2002",
    phone: "08212345678",
    age: "20",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Mendapatkan daftar pengguna
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // Menambahkan pengguna baru
    const newUser = req.body;
    newUser.id = Date.now().toString(); // Buat ID unik
    users.push(newUser);
    res.status(201).json(newUser);
  } else if (req.method === "PUT") {
    // Mengedit pengguna berdasarkan ID
    const { id, updatedUser } = req.body;
    const index = users.findIndex(user => user.id === id);
    console.log('====================================');
    console.log(index);
    console.log(updatedUser, '====================================');
    if (index !== -1) {
      users[index] = updatedUser;
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else if (req.method === "DELETE") {
    // Menghapus pengguna berdasarkan ID
    const { id } = req.body;
    users = users.filter(user => user.id !== id);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
