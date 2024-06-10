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
var PlugIn_js_1 = require("./PlugIn.js");
var FilesOperations_js_1 = require("./FilesOperations.js");
var SysOperations_js_1 = require("./SysOperations.js");
var PlugInList = /** @class */ (function () {
    function PlugInList() {
        this._list = new Map();
        this._length = 0;
        this._last = new PlugIn_js_1.default("", "");
    }
    PlugInList.prototype.add = function (pluginName) {
        var _this = this;
        // Try just download and save the list state
        // Save to the registry later, as a
        // separated feature.
        SysOperations_js_1.default.download(pluginName)
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            var manifestFile, newPlugin, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FilesOperations_js_1.default.readManifest(pluginName)];
                    case 1:
                        manifestFile = _a.sent();
                        newPlugin = new PlugIn_js_1.default(manifestFile.name, manifestFile.description);
                        id = this._generateID();
                        newPlugin.id = id;
                        this._list.set(id, newPlugin);
                        return [2 /*return*/, newPlugin];
                }
            });
        }); })
            .then(function (pl) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(pl instanceof PlugIn_js_1.default)) return [3 /*break*/, 2];
                        this._last = pl;
                        this._length += 1;
                        return [4 /*yield*/, FilesOperations_js_1.default.updateRegistry(pl)];
                    case 1:
                        _a.sent();
                        console.warn("Registered!");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (rej) {
            console.error(rej);
        })
            .finally(function () { return console.warn("Download finished"); });
    };
    /*
      public updatePlugin(oldPlugin: PlugIn): void {
        const updatedPlugin = updatePlugin(oldPlugin.name);
        const oldID = oldPlugin.id;
        updatedPlugin.id = oldID;
    
        this._list.set(oldID, updatedPlugin);
      }
    */
    PlugInList.prototype.del = function (pluginID) {
        if (this._list.has(pluginID)) {
            this._list.delete(pluginID);
        }
        else {
            throw new Error("This id isn't related to any plugin.");
        }
    };
    PlugInList.prototype.searchByName = function (pluginName) {
        for (var _i = 0, _a = this._list.values(); _i < _a.length; _i++) {
            var pl = _a[_i];
            if (pl.name === pluginName) {
                return pl;
            }
        }
        throw new Error("There's no plugin with this name :(");
    };
    PlugInList.prototype._generateID = function () {
        return this._last.id *= 3;
    };
    Object.defineProperty(PlugInList.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlugInList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    return PlugInList;
}());
exports.default = PlugInList;
