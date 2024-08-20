const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fid: {
        type: String,
        required: true
    },
    cus_id: {
        type: String,
        required: true
    },
    jwel_id: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    Rating: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
