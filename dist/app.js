"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
// Parsers added
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//  routes
app.use('/api/users', user_route_1.UserRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to our Assaignment-2 API!',
    });
});
exports.default = app;
