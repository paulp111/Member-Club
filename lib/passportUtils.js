const bcrypt = require('bcryptjs');


module.exports = {
    verifyPassword: async (password, pwHash) => {
        return await bcrypt.compare( password, pwHash);
    },
};