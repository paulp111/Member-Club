const bcrypt = require("bcrypt");

module.exports = {
    verifyPassword: async (password, pwHash) => {
        return await bcrypt.compare( password, pwHash);
    },
};