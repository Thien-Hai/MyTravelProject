"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TypeOrmConfigSerivce = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var TypeOrmConfigSerivce = /** @class */ (function () {
    function TypeOrmConfigSerivce() {
    }
    TypeOrmConfigSerivce.prototype.createTypeOrmOptions = function () {
        return {
            type: 'postgres',
            host: this.config.get('PG_HOST', 'localhost'),
            port: this.config.get('PG_PORT'),
            username: this.config.get('PG_USERNAME'),
            password: this.config.get('PG_PASSWORD'),
            database: this.config.get('PG_DATABASE'),
            autoLoadEntities: true,
            synchronize: true
        };
    };
    __decorate([
        (0, common_1.Inject)(config_1.ConfigService)
    ], TypeOrmConfigSerivce.prototype, "config");
    TypeOrmConfigSerivce = __decorate([
        (0, common_1.Injectable)()
    ], TypeOrmConfigSerivce);
    return TypeOrmConfigSerivce;
}());
exports.TypeOrmConfigSerivce = TypeOrmConfigSerivce;
