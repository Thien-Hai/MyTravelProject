"use strict";
exports.__esModule = true;
exports.IsPassword = void 0;
var class_validator_1 = require("class-validator");
var password_regex_1 = require("../regex/password.regex");
function IsPassword(level, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    if (!level)
                        return false;
                    var levelRegex = password_regex_1.PASSWORD_REGEX[level];
                    return levelRegex.test(value);
                },
                defaultMessage: function (args) {
                    return level ? password_regex_1.PASSWORD_MESSAGE[level] : 'Mật khẩu chưa đủ mạnh';
                }
            }
        });
    };
}
exports.IsPassword = IsPassword;
