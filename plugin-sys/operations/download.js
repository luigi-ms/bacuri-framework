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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPlugin = exports.readInfoFile = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
//import util from "util";
var exceptions_1 = require("../exceptions");
function readInfoFile(pluginName) {
    return __awaiter(this, void 0, void 0, function () {
        var folderPath, handler, reader, json, err_1, details;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    folderPath = "installed/".concat(pluginName.split("/")[1]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fs_1.promises.open("".concat(folderPath, "/info.json"))];
                case 2:
                    handler = _a.sent();
                    return [4 /*yield*/, handler.readFile("utf8")];
                case 3:
                    reader = _a.sent();
                    return [4 /*yield*/, JSON.parse(reader)];
                case 4:
                    json = _a.sent();
                    return [2 /*return*/, json];
                case 5:
                    err_1 = _a.sent();
                    details = err_1 ? err_1.message : "";
                    throw new exceptions_1.ReadFileException(details);
                case 6:
                    handler === null || handler === void 0 ? void 0 : handler.close();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.readInfoFile = readInfoFile;
function downloadPlugin(pluginName) {
    return __awaiter(this, void 0, void 0, function () {
        var nameSplitted, git;
        return __generator(this, function (_a) {
            nameSplitted = pluginName.split("/")[1];
            try {
                git = (0, child_process_1.spawn)("git", ["clone", "https://github.com/".concat(pluginName), "./installed/".concat(nameSplitted)], { stdio: ['ignore', 'pipe', 'pipe'] });
                //  const git = spawn("ping", ["google.com"]);
                git.stdout.on("data", function (data) { return console.log("".concat(data)); });
                git.stderr.on("data", function (data) { return console.error("".concat(data)); });
                git.on("close", function (code) { return console.log("Finished with code ".concat(code)); });
            }
            catch (err) {
                return [2 /*return*/, Promise.reject((err instanceof Error)
                        ? new exceptions_1.GenericException(err.message)
                        : new exceptions_1.DownloadException(err))];
            }
            return [2 /*return*/];
        });
    });
}
exports.downloadPlugin = downloadPlugin;
downloadPlugin("luigi-ms/pluginTest");
