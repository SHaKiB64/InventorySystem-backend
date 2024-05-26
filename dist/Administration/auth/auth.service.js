"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(adminService, jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.blacklistTokens = new Set();
    }
    async signUp(myobj) {
        return await this.adminService.createAdmin(myobj);
    }
    async signIn(logindata) {
        const user = await this.adminService.findOneBy(logindata);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials. Please check your email and password.');
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async logout(token) {
        this.blacklistTokens.add(token);
        const newToken = await this.jwtService.signAsync({});
        return { access_token: newToken };
    }
    isTokenBlacklisted(token) {
        return this.blacklistTokens.has(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map