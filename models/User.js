const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.generateJWT = function () {
    const payload = { id: this._id, username: this.username };
    return jwt.sign(payload, 'test', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', UserSchema);
