const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Create Feedback
router.post('/feedback/save', async (req, res) => {
    try {
        let newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(200).json({
            success: "Feedback Added Successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Read Feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json({
            success: true,
            feedback
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Update Feedback
router.put('/feedback/update/:id', async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedFeedback) {
            return res.status(404).json({
                error: "Feedback not found"
            });
        }
        res.status(200).json({
            success: "Feedback Updated Successfully",
            updatedFeedback
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Delete Feedback
router.delete('/feedback/delete/:id', async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedFeedback) {
            return res.status(404).json({
                error: "Feedback not found"
            });
        }
        res.status(200).json({
            success: "Feedback Deleted Successfully",
            deletedFeedback
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;
