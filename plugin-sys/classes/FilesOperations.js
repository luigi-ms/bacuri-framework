"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs_1 = require("fs");
var Exceptions_js_1 = require("./Exceptions.js");
var FilesOperations = /** @class */ (function () {
    function FilesOperations() {
    }
    FilesOperations.readManifest = function (pluginName) {
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
                        throw new Exceptions_js_1.ReadFileException(details);
                    case 6:
                        handler === null || handler === void 0 ? void 0 : handler.close();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FilesOperations.updateRegistry = function (pl) {
        return __awaiter(this, void 0, void 0, function () {
            var handler, reader, registry, newRegistry, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        return [4 /*yield*/, fs_1.promises.open("./registry.json")];
                    case 1:
                        handler = _a.sent();
                        return [4 /*yield*/, handler.readFile("utf8")];
                    case 2:
                        reader = _a.sent();
                        registry = JSON.parse(reader);
                        newRegistry = JSON.stringify(__assign(__assign({}, registry), { pl: pl }));
                        return [4 /*yield*/, handler.writeFile(newRegistry)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        err_2 = _a.sent();
                        console.error(err_2 instanceof Exceptions_js_1.Exception ? err_2.getResume() : err_2);
                        return [3 /*break*/, 6];
                    case 5:
                        handler === null || handler === void 0 ? void 0 : handler.close();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FilesOperations.existsInLocal = function (pluginName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    return FilesOperations;
}());
exports.default = FilesOperations;
