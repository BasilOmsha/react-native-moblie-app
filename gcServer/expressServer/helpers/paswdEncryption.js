const bcrypt = require('bcrypt');

// Paswword encryption
const encrypt = async (paswd) => {
    const salt = 14;
    try {
        // Auto-gen a salt and hash https://www.npmjs.com/package/bcrypt
        const hashedPaswd = await bcrypt.hash(paswd, salt);
        return hashedPaswd;
    } catch (error) {
        console.log("Error hashing paswd" + error);
    }
}

module.exports = encrypt;