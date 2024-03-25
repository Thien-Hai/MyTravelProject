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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordDto = exports.ForgotPasswordDto = exports.LoginAuthDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
// CORE
// SHARED
var custom_1 = require("../../../../core/src/util/transformer/custom");
var password_validator_1 = require("../../../../core/src/validator/custom/password.validator");
var LoginAuthDto = /** @class */ (function () {
    function LoginAuthDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'nguyensangptit@gmail.com' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Trường này không được để trống' }),
        (0, class_validator_1.IsEmail)(),
        (0, custom_1.Trim)(),
        (0, class_validator_1.MinLength)(1, { message: 'Email phải ít nhất 1 ký tự' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Email tối đa 30 ký tự' })
    ], LoginAuthDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123123' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Trường này không được để trống' }),
        (0, class_validator_1.IsString)()
        // @IsPassword('HIGH')
        ,
        (0, class_validator_1.MinLength)(5, { message: 'Phải có ít nhất 5 ký tự' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Chỉ tối đa 30 ký tự' })
    ], LoginAuthDto.prototype, "password");
    return LoginAuthDto;
}());
exports.LoginAuthDto = LoginAuthDto;
var ForgotPasswordDto = /** @class */ (function (_super) {
    __extends(ForgotPasswordDto, _super);
    function ForgotPasswordDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123123aA!' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Trường này không được để trống' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5, { message: 'Phải có ít nhất 5 ký tự' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Chỉ tối đa 30 ký tự' }),
        (0, password_validator_1.IsPassword)('HIGH')
    ], ForgotPasswordDto.prototype, "newPassword");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '8888' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], ForgotPasswordDto.prototype, "code");
    return ForgotPasswordDto;
}((0, swagger_1.PickType)(LoginAuthDto, ['email'])));
exports.ForgotPasswordDto = ForgotPasswordDto;
var ChangePasswordDto = /** @class */ (function (_super) {
    __extends(ChangePasswordDto, _super);
    function ChangePasswordDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123123aA!' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Trường này không được để trống' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5, { message: 'Phải có ít nhất 5 ký tự' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Chỉ tối đa 30 ký tự' })
    ], ChangePasswordDto.prototype, "oldPassword");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '123123aA!' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'Trường này không được để trống' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5, { message: 'Phải có ít nhất 5 ký tự' }),
        (0, class_validator_1.MaxLength)(30, { message: 'Chỉ tối đa 30 ký tự' }),
        (0, password_validator_1.IsPassword)('HIGH')
    ], ChangePasswordDto.prototype, "newPassword");
    return ChangePasswordDto;
}((0, swagger_1.PickType)(LoginAuthDto, ['email'])));
exports.ChangePasswordDto = ChangePasswordDto;
// export class ResponseLoginDto extends CreateUserResponseDto {}
