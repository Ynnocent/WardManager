
const getUsers = (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json({ users });
  } catch (error) {
    res.status(400).json({
      error: "Error Getting Users",
    });
  }
};

const addUser = (req, res) => {
  const { name, email } = req.body;
  try {
    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?,?)");
    const info = stmt.run(name, email);

    res.json({
      id: info.lastInsertRowid,
      name,
      email,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error Creating User",
    });
  }
};

module.exports = {
    getUsers,
    addUser
}