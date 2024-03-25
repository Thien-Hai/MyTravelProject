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
var _a, _b;
exports.__esModule = true;
exports.QueryDbError = exports.ValidationError = exports.ValidationPartialError = exports.FailedDependency = exports.PayloadTooLarge = exports.TemporaryRedirect = exports.UnsupportedMediaType = exports.Conflict = exports.NotAcceptable = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.BusinessException = exports.BaseException = exports.SUCCESS_MESSAGE = exports.STATUS_CODE_MAP = exports.QUERY_DB_ERROR = exports.PROTECTED = exports.DUPLICATE = exports.NOT_FOUND = exports.VALIDATION = exports.SYSTEM_ERROR = exports.UNKNOWN = exports.SUCCESS = void 0;
var fs = require("fs");
var common_1 = require("@nestjs/common");
var api_schemas_1 = require("../api.schemas");
var message_constant_1 = require("../../constants/message.constant");
/**
 * MODULE_ACTION_ERROR: xyz zzt
 * @param x {string}: module
 * @param y {number}: function
 * @param z {number}: error code in function
 * @param t {string}: first char of filename
 **/
// 99**** GLOBAL
exports.SUCCESS = '000000';
exports.UNKNOWN = '999999';
exports.SYSTEM_ERROR = '990001';
// export const REQUIRE_LOGIN = '000002';
// export const UNKNOWN_METHOD = '000003';
// export const SEARCH_CHECK_KEYWORD = '000006';
// export const NOT_ENOUGH_PARAM = '000007';
// export const UNAUTHORIZED = '000011';
// 01**** VALIDATE
exports.VALIDATION = '010009';
// 02**** DATABASE
exports.NOT_FOUND = '020008';
exports.DUPLICATE = '020010';
exports.PROTECTED = '020012';
exports.QUERY_DB_ERROR = '020013';
// 03**** BASE API
// 0001** CUSTOM APP API
// 0002** CUSTOM APP SERVICE
exports.STATUS_CODE_MAP = (_a = {},
    _a[common_1.HttpStatus.NOT_FOUND] = exports.NOT_FOUND,
    _a);
var ALL_MESSAGES = __assign(__assign({}, message_constant_1.ERROR_MESSAGES), (_b = {}, _b[exports.SUCCESS] = 'Success', _b[exports.UNKNOWN] = 'Unknown error', _b[exports.SYSTEM_ERROR] = 'Uh oh! Something went wrong. Please report to develop team.', _b[exports.NOT_FOUND] = 'The requested information could not be found.', _b[exports.VALIDATION] = 'Invalid input data.', _b[exports.DUPLICATE] = 'Duplicate information.', _b));
exports.SUCCESS_MESSAGE = ALL_MESSAGES[exports.SUCCESS];
var ALL_ERROR_CODE = Object.keys(ALL_MESSAGES);
var getMessageFromCode = function (errorCode, defaultMessage) {
    var message = ALL_MESSAGES[errorCode] || '';
    if (!message) {
        var errorCodeWoutPrefix = ALL_ERROR_CODE.filter(function (item) {
            return errorCode.endsWith(item);
        });
        message = errorCodeWoutPrefix[0]
            ? ALL_MESSAGES[errorCodeWoutPrefix[0]]
            : message;
    }
    message = message || defaultMessage;
    if (!message)
        fs.writeFile('error-codes-missing-message.log', errorCode + '\n', { flag: 'a' }, function () { });
    return message;
};
var BaseException = /** @class */ (function (_super) {
    __extends(BaseException, _super);
    function BaseException(partial, statusCode, defaultMessage) {
        if (defaultMessage === void 0) { defaultMessage = ''; }
        var payload = __assign(__assign({}, api_schemas_1.defaultPayload), partial);
        payload.success = payload.errorCode === exports.SUCCESS && payload.message === '';
        payload.message =
            payload.message || getMessageFromCode(payload.errorCode, defaultMessage);
        return _super.call(this, payload, statusCode) || this;
    }
    return BaseException;
}(common_1.HttpException));
exports.BaseException = BaseException;
/**
 * response to client an error
 * @example
 * throw new exc.BusinessException<number>({
    errorCode: 'USER011C',
    message: 'exc msg',
    data: 1
  });
 */
var BusinessException = /** @class */ (function (_super) {
    __extends(BusinessException, _super);
    function BusinessException(payload, statusCode) {
        if (statusCode === void 0) { statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR; }
        return _super.call(this, payload, statusCode) || this;
    }
    return BusinessException;
}(BaseException));
exports.BusinessException = BusinessException;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(payload) {
        return _super.call(this, payload, common_1.HttpStatus.BAD_REQUEST) || this;
    }
    return BadRequest;
}(BaseException));
exports.BadRequest = BadRequest;
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(payload) {
        return _super.call(this, payload, common_1.HttpStatus.UNAUTHORIZED) || this;
    }
    return Unauthorized;
}(BaseException));
exports.Unauthorized = Unauthorized;
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(payload) {
        return _super.call(this, payload, common_1.HttpStatus.FORBIDDEN) || this;
    }
    return Forbidden;
}(BaseException));
exports.Forbidden = Forbidden;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(payload) {
        return _super.call(this, payload, common_1.HttpStatus.NOT_FOUND, ALL_MESSAGES[exports.NOT_FOUND]) || this;
    }
    return NotFound;
}(BaseException));
exports.NotFound = NotFound;
var MethodNotAllowed = /** @class */ (function (_super) {
    __extends(MethodNotAllowed, _super);
    function MethodNotAllowed(payload) {
        return _super.call(this, payload, common_1.HttpStatus.METHOD_NOT_ALLOWED) || this;
    }
    return MethodNotAllowed;
}(BaseException));
exports.MethodNotAllowed = MethodNotAllowed;
var NotAcceptable = /** @class */ (function (_super) {
    __extends(NotAcceptable, _super);
    function NotAcceptable(payload) {
        return _super.call(this, payload, common_1.HttpStatus.NOT_ACCEPTABLE) || this;
    }
    return NotAcceptable;
}(BaseException));
exports.NotAcceptable = NotAcceptable;
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(payload) {
        return _super.call(this, payload, common_1.HttpStatus.CONFLICT) || this;
    }
    return Conflict;
}(BaseException));
exports.Conflict = Conflict;
var UnsupportedMediaType = /** @class */ (function (_super) {
    __extends(UnsupportedMediaType, _super);
    function UnsupportedMediaType(payload) {
        return _super.call(this, payload, common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE, 'Unsupported format file') || this;
    }
    return UnsupportedMediaType;
}(BaseException));
exports.UnsupportedMediaType = UnsupportedMediaType;
var TemporaryRedirect = /** @class */ (function (_super) {
    __extends(TemporaryRedirect, _super);
    function TemporaryRedirect(payload) {
        return _super.call(this, payload, common_1.HttpStatus.TEMPORARY_REDIRECT) || this;
    }
    return TemporaryRedirect;
}(BaseException));
exports.TemporaryRedirect = TemporaryRedirect;
var PayloadTooLarge = /** @class */ (function (_super) {
    __extends(PayloadTooLarge, _super);
    function PayloadTooLarge(payload) {
        return _super.call(this, payload, common_1.HttpStatus.PAYLOAD_TOO_LARGE, 'Data exceeds the allowed size') || this;
    }
    return PayloadTooLarge;
}(BaseException));
exports.PayloadTooLarge = PayloadTooLarge;
var FailedDependency = /** @class */ (function (_super) {
    __extends(FailedDependency, _super);
    function FailedDependency(payload) {
        return _super.call(this, payload, common_1.HttpStatus.FAILED_DEPENDENCY, 'The request failed due to failure of a previous request.') || this;
    }
    return FailedDependency;
}(BaseException));
exports.FailedDependency = FailedDependency;
var ValidationPartialError = /** @class */ (function (_super) {
    __extends(ValidationPartialError, _super);
    function ValidationPartialError(payload) {
        return _super.call(this, __assign({ errorCode: exports.VALIDATION }, payload)) || this;
    }
    return ValidationPartialError;
}(BadRequest));
exports.ValidationPartialError = ValidationPartialError;
function reduceConstraintMsgs(validationErrors) {
    return validationErrors.reduce(function (acc, cur) {
        acc = acc.concat(Object.values((cur === null || cur === void 0 ? void 0 : cur.constraints) || {}));
        if (cur === null || cur === void 0 ? void 0 : cur.children)
            acc = acc.concat(reduceConstraintMsgs(cur === null || cur === void 0 ? void 0 : cur.children));
        return acc;
    }, []);
}
var regex = /^[A-Z_]*[0-9]*$/;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(validationErrors) {
        var _a;
        var errorCode = exports.VALIDATION;
        var constraintMsgs = reduceConstraintMsgs(validationErrors);
        var errorCodes = constraintMsgs
            .filter(function (message) { return regex.test(message); })
            .sort();
        if (errorCodes.length)
            errorCode = errorCodes[0];
        var payload = {
            errorCode: errorCode,
            message: (_a = constraintMsgs[0]) !== null && _a !== void 0 ? _a : ALL_MESSAGES[exports.VALIDATION],
            data: validationErrors.reduce(function (acc, cur) {
                if (acc.length === 0) {
                    var item = { target: cur.target };
                    delete cur.target;
                    item['error'] = [cur];
                    acc.push(item);
                    return acc;
                }
                delete cur.target;
                acc[0]['error'].push(cur);
                return acc;
            }, [])
        };
        return _super.call(this, payload) || this;
    }
    return ValidationError;
}(BadRequest));
exports.ValidationError = ValidationError;
var QueryDbError = /** @class */ (function (_super) {
    __extends(QueryDbError, _super);
    function QueryDbError(payload) {
        return _super.call(this, payload) || this;
    }
    return QueryDbError;
}(BadRequest));
exports.QueryDbError = QueryDbError;
