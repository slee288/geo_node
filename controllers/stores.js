const Store = require("../models/Store");

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });
    } catch(err) {
        console.error(err);
        // Server Error
        res.status(500).json({
            error: "Server error"
        });
    }
};

// @desc    Create a store
// @route   POST /api/v1/stores
// @access  public
exports.addStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body);

        return res.status(200).json({
            success: true,
            data: store
        });
    } catch(err) {
        console.error(err);

        // Duplicate Key Error: user error
        if(err.code === 11000) {
            return res.status(400).json({
                error: "This store already exists"
            });
        }

        // Server Error
        res.status(500).json({
            error: "Server error"
        });
    }
};
