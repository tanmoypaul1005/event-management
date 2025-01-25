const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    image: { type: String },

}, { timestamps: true });

export default mongoose?.models?.User || mongoose.model('User', userSchema);