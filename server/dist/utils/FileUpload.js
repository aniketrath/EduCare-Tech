"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single('file');
const FileUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            if (!req.file) {
                return reject('No file uploaded.');
            }
            resolve(req.file.filename);
        });
    });
};
const multi_upload = (0, multer_1.default)({ storage }).array('files', 1000);
const MultiFileUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        multi_upload(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            if (req.files && Array.isArray(req.files)) {
                resolve(req.files.map((file) => file.filename));
            }
            else {
                return reject('No files uploaded.');
            }
            if (req.file) {
                resolve([req.file.filename]);
            }
            else {
                return reject('No files uploaded.');
            }
        });
    });
};
exports.MultiFileUpload = MultiFileUpload;
exports.default = FileUpload;
//# sourceMappingURL=FileUpload.js.map