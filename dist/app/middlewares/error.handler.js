"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    console.error(`Error occurred: ${error.name} \n`, error.message);
    if (error.name === "ValidationError") {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
        return;
    }
    else if (error.code === 11000) {
        res.status(400).json({
            success: false,
            message: "Duplicate value rejected",
            error: error,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: error.message,
        error: error,
    });
    next();
}
