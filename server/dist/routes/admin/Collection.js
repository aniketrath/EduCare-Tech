"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Collection_1 = require("../../controllers/admin/Collection");
const VerifyAdmin_1 = __importDefault(require("../../middleware/VerifyAdmin"));
const collectionsRouter = (0, express_1.Router)();
collectionsRouter.route('/all').all(VerifyAdmin_1.default).get(Collection_1.AllCollections);
collectionsRouter.route('/create').all(VerifyAdmin_1.default).post(Collection_1.CreateCollection);
exports.default = collectionsRouter;
//# sourceMappingURL=Collection.js.map