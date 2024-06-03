"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadException = exports.ReadFileException = exports.GenericException = exports.Exception = void 0;
var Exception = /** @class */ (function () {
    function Exception() {
        this._code = "";
        this._name = "";
        this._message = "";
        this.details = "no extra info";
    }
    Exception.prototype.getResume = function () {
        return "[".concat(this.code, "] ").concat(this.name, ": ").concat(this.message, "(").concat(this.details, ")");
    };
    Object.defineProperty(Exception.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    return Exception;
}());
exports.Exception = Exception;
var GenericException = /** @class */ (function (_super) {
    __extends(GenericException, _super);
    function GenericException(details) {
        if (details === void 0) { details = "no extra info"; }
        var _this = _super.call(this) || this;
        _this._code = "EXCEP";
        _this._name = "GenericException";
        _this.details = details;
        return _this;
    }
    return GenericException;
}(Exception));
exports.GenericException = GenericException;
var ReadFileException = /** @class */ (function (_super) {
    __extends(ReadFileException, _super);
    function ReadFileException(details) {
        if (details === void 0) { details = "no extra info"; }
        var _this = _super.call(this) || this;
        _this._code = "DOWN01";
        _this._name = "ReadFileException";
        _this._message = "Cannot open or read this file";
        _this.details = details;
        return _this;
    }
    return ReadFileException;
}(Exception));
exports.ReadFileException = ReadFileException;
var DownloadException = /** @class */ (function (_super) {
    __extends(DownloadException, _super);
    function DownloadException(details) {
        if (details === void 0) { details = "no extra info"; }
        var _this = _super.call(this) || this;
        _this._code = "DOWN02";
        _this._name = "DownloadException";
        _this._message = "Something happened downloading this plugin";
        _this.details = details;
        return _this;
    }
    return DownloadException;
}(Exception));
exports.DownloadException = DownloadException;
