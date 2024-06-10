"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlugIn = /** @class */ (function () {
    function PlugIn(name, description) {
        this.id = 1;
        this._name = name;
        this._description = description;
        this._version = 0;
        this._author = "";
    }
    Object.defineProperty(PlugIn.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlugIn.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlugIn.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlugIn.prototype, "author", {
        get: function () {
            return this._author;
        },
        enumerable: false,
        configurable: true
    });
    return PlugIn;
}());
exports.default = PlugIn;
