export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admins = [
    {
      email: "essentialaquatechindia@gmail.com",
      password: "Essentialaquatech@2019",
      name: "Admin Essential 1"
    },
    {
      email: "essentialaquatech24x7@gmail.com",
      password: "Essentialaquatech@2019",
      name: "Admin Essential 2"
    }
  ];

  const admin = admins.find(
    (a) => a.email === email && a.password === password
  );

  if (!admin) {
    return res.status(401).json({ message: "Invalid Admin Credentials" });
  }

  res.status(200).json({
    message: "Admin Login Successful",
    admin: {
      email: admin.email,
      name: admin.name,
      role: "admin"
    }
  });
};
