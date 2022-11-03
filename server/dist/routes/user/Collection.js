"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Collection_1 = require("../../controllers/user/Collection");
const VerifyUser_1 = __importDefault(require("../../middleware/VerifyUser"));
const collectionsRouter = (0, express_1.Router)();
collectionsRouter.route('/all').all(VerifyUser_1.default).get(Collection_1.AllCollections);
exports.default = collectionsRouter;
//# sourceMappingURL=Collection.js.map