const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    start_time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose?.models?.Event || mongoose.model('Event', eventSchema);