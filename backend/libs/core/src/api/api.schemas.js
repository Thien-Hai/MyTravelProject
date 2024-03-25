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
exports.ArrayPayload = exports.ObjectPayload = exports.StringPayload = exports.NullPayload = exports.BasePayloadDto = exports.Payload = exports.defaultPayload = void 0;
var swagger_1 = require("@nestjs/swagger");
exports.defaultPayload = {
    success: true,
    errorCode: '000000',
    message: '',
    data: null,
    meta: {}
};
var Payload = /** @class */ (function () {
    function Payload(partial) {
        Object.assign(this, partial);
    }
    return Payload;
}());
exports.Payload = Payload;
var BasePayloadDto = /** @class */ (function () {
    function BasePayloadDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: true })
    ], BasePayloadDto.prototype, "success");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'changeme' })
    ], BasePayloadDto.prototype, "message");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '000000' })
    ], BasePayloadDto.prototype, "errorCode");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: null, nullable: true })
    ], BasePayloadDto.prototype, "data");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: {}, nullable: true })
    ], BasePayloadDto.prototype, "meta");
    return BasePayloadDto;
}());
exports.BasePayloadDto = BasePayloadDto;
var NullPayload = /** @class */ (function (_super) {
    __extends(NullPayload, _super);
    function NullPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NullPayload;
}(Payload));
exports.NullPayload = NullPayload;
var StringPayload = /** @class */ (function (_super) {
    __extends(StringPayload, _super);
    function StringPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringPayload;
}(Payload));
exports.StringPayload = StringPayload;
var ObjectPayload = /** @class */ (function (_super) {
    __extends(ObjectPayload, _super);
    function ObjectPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectPayload;
}(Payload));
exports.ObjectPayload = ObjectPayload;
var ArrayPayload = /** @class */ (function (_super) {
    __extends(ArrayPayload, _super);
    function ArrayPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArrayPayload;
}(Payload));
exports.ArrayPayload = ArrayPayload;
