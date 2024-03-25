"use strict";
var _a;
exports.__esModule = true;
exports.ERROR_MESSAGES = exports.ERROR_CODES = void 0;
// 01**** VALIDATE
// 02**** DATABASE
// 03**** BASE API
// 0001** CUSTOM APP API
// 0002** CUSTOM APP SERVICE
var AUTH = {
    UNAUTHORIZED: 'AUTH000101',
    REQUIRE_LOGIN: 'AUTH000102'
};
var USER = {};
exports.ERROR_CODES = {
    AUTH: AUTH,
    USER: USER
};
exports.ERROR_MESSAGES = (_a = {},
    _a[AUTH.UNAUTHORIZED] = 'Unauthorized account',
    _a[AUTH.REQUIRE_LOGIN] = 'Required login',
    _a);
