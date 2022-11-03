"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//  ------------------------- Connection with DB
const DB_1 = __importDefault(require("./config/DB"));
(0, DB_1.default)();
//  ------------------------- Setup Logger
const Logger_1 = __importDefault(require("./utils/Logger"));
global.logger = Logger_1.default;
global.__basedir = __dirname.slice(0, __dirname.lastIndexOf('/'));
//  ------------------------- Imports
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const moment_1 = __importDefault(require("moment"));
const app = (0, express_1.default)();
//  ------------------------- Modals
const Question_1 = __importDefault(require("./model/Question"));
const Admin_1 = __importDefault(require("./model/Admin"));
const Collection_1 = __importDefault(require("./model/Collection"));
const Program_1 = __importDefault(require("./model/Program"));
const Test_1 = __importDefault(require("./model/Test"));
const Result_1 = __importDefault(require("./model/Result"));
const User_1 = __importDefault(require("./model/User"));
const Skill_1 = __importDefault(require("./model/Skill"));
// ----------------------------------------------------CORS
const cors_1 = __importDefault(require("cors"));
const allowlist = ['http://localhost:3001'];
const corsOptionsDelegate = (req, callback) => {
    const corsOptions = { origin: false, credentials: false };
    const isDomainAllowed = allowlist.includes(req.header('Origin') || '');
    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions.origin = true;
        corsOptions.credentials = true;
    }
    callback(null, corsOptions);
};
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptionsDelegate));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(__basedir + '/static'));
app.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Question_1.default.find();
    yield Admin_1.default.find();
    yield Collection_1.default.find();
    yield Test_1.default.find();
    yield Result_1.default.find();
    yield User_1.default.find();
    yield Skill_1.default.find();
    yield Program_1.default.find();
    res.status(200).json({
        success: true,
        message: 'API Working',
    });
}));
//  ------------------------- Routes
const Auth_1 = __importDefault(require("./routes/admin/Auth"));
const Skill_2 = __importDefault(require("./routes/admin/Skill"));
const Program_2 = __importDefault(require("./routes/admin/Program"));
const Collection_2 = __importDefault(require("./routes/admin/Collection"));
const Test_2 = __importDefault(require("./routes/admin/Test"));
app.use('/auth', Auth_1.default);
app.use('/skills', Skill_2.default);
app.use('/programs', Program_2.default);
app.use('/collections', Collection_2.default);
app.use('/tests', Test_2.default);
app.get('/image/:imageID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.imageID) {
        return res.status(404);
    }
    try {
        res.sendFile(__basedir + '/static/uploads/' + req.params.imageID);
    }
    catch (e) {
        return res.status(404);
    }
}));
app.get('/file/:fileID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.fileID) {
        return res.status(404).json("File doesn't exist");
    }
    try {
        res.sendFile(__basedir + '/static/uploads/' + req.params.fileID);
    }
    catch (e) {
        return res.status(404);
    }
}));
const PORT = process.env.ADMIN_PORT;
const server = app.listen(PORT, () => console.log(`Server running at ${getTime()} on port ${PORT}`));
process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log(`Logged Error at ${getTime()}: ${err.message}`);
    server.close(() => process.exit(1));
});
const getTime = () => {
    return (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
};
//# sourceMappingURL=admin-server.js.map