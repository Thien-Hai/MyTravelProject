"use strict";
exports.__esModule = true;
exports.Trim = void 0;
var class_transformer_1 = require("class-transformer");
var HttpExc = require("../api/exception/exception.resolver");
// CORE
function trimValue(value, key) {
    if (typeof value !== 'string')
        throw new HttpExc.BadRequest({
            message: "".concat(key, " must be a string"),
            errorCode: "VALIDATE_TRANSFORMER"
        });
    return value.trim();
}
/**
 * Function to automatically remove trailing whitespace from a string
 */
function Trim() {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value, key = _a.key;
        return trimValue(value, key);
    });
}
exports.Trim = Trim;
