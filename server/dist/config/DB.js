"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    // Connecting to the database
    mongoose_1.default
        .connect(process.env.DATABASE_URL)
        .then(() => {
        console.log('Successfully connected to database');
    })
        .catch((error) => {
        console.log('database connection failed. exiting now...');
        console.error(error);
        logger(error);
        process.exit(1);
    });
};
exports.default = connect;
//# sourceMappingURL=DB.js.map