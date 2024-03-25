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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.ApiTagsAndBearer = exports.ApiBulkDeleteOperation = exports.ApiDeleteOperation = exports.ApiUpdateOperation = exports.ApiCreateOperation = exports.ApiRetrieveOperation = exports.ApiListOperation = void 0;
var swagger_1 = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
__exportStar(require("@nestjs/swagger"), exports);
var createApiOperation = function (defaultOptions) {
    return function (options) {
        return (0, swagger_1.ApiOperation)(__assign(__assign({}, defaultOptions), options));
    };
};
exports.ApiListOperation = createApiOperation({ summary: 'List all' });
exports.ApiRetrieveOperation = createApiOperation({
    summary: 'Get information a record'
});
exports.ApiCreateOperation = createApiOperation({ summary: 'Create new' });
exports.ApiUpdateOperation = createApiOperation({
    summary: 'Edit a record'
});
exports.ApiDeleteOperation = createApiOperation({
    summary: 'Delete a record'
});
exports.ApiBulkDeleteOperation = createApiOperation({
    summary: 'Delete multiple records'
});
var header = (0, swagger_1.ApiBearerAuth)();
function ApiTagsAndBearer() {
    var tags = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tags[_i] = arguments[_i];
    }
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), swagger_1.ApiTags.apply(void 0, tags), header);
}
exports.ApiTagsAndBearer = ApiTagsAndBearer;
