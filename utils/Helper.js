const bcrypt = require("bcryptjs");
const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.log(err);
    throw new Error("Error hashing password");
  }
};

module.exports = {
  hashedPassword,
};
