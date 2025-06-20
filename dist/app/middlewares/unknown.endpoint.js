"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = unknownEndpoint;
function unknownEndpoint(req, res) {
    res.status(404).send({
        success: false,
        message: "Reached unknown endpoint",
        error: {
            name: "UnknownEndpoint",
            path: req.path,
        },
    });
}
