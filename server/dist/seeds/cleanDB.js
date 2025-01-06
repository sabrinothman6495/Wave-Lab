"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sound_1 = __importDefault(require("../models/Sound"));
const user_1 = __importDefault(require("../models/user"));
const process_1 = __importDefault(require("process"));
async function cleanDB() {
    await Sound_1.default.deleteMany({});
    await user_1.default.deleteMany({});
    process_1.default.exit(0);
}
cleanDB();
exports.default = cleanDB;
