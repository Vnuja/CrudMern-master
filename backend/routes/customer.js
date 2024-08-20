const express = require('express');
const Customer = require('../models/customer'); // Import the Customer model

const router = express.Router();

// Create customers
router.post('/customer/save', async (req, res) => {
    try {
        let newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(200).json({
            success: "Customer Added Successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Read customers
router.get('/customer', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            customers // List of customers
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Update customers
router.put('/customer/update/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );
        if (!updatedCustomer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }
        res.status(200).json({
            success: "Customer Updated Successfully",
            updatedCustomer
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Delete customers
router.delete('/customer/delete/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }
        res.status(200).json({
            success: "Customer Deleted Successfully",
            deletedCustomer
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;
