"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const Log = (data) => {
    const time = (0, moment_1.default)().format('YYYY-MM-DD hh:mm A :: ');
    const logData = time.concat(data).concat('\n');
    fs_1.default.appendFile(__basedir + `/static/logs/${(0, moment_1.default)().format('MMM YYYY')}.log`, logData, 'utf8', function (err) {
        if (err) {
            console.log('Error Saving Log File');
            console.log(err);
        }
    });
};
exports.default = Log;
//# sourceMappingURL=Logger.js.map