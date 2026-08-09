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
exports.UserContextInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const user_context_storage_1 = require("./user-context.storage");
const typeorm_1 = require("typeorm");
let UserContextInterceptor = class UserContextInterceptor {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.userId || request.user?.id || request.headers['user-id'] || request.headers['id'] || request.headers['x-user-id'] || null;
        const method = request.method?.toUpperCase();
        const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        const needsTransaction = writeMethods.includes(method);
        if (!userId) {
            return next.handle();
        }
        if (!needsTransaction) {
            return next.handle();
        }
        return (0, rxjs_1.from)(this.dataSource.transaction(async (manager) => {
            return await user_context_storage_1.userContextStorage.run({ userId }, async () => {
                await manager.query("SELECT set_config('app.current_user_id', $1, true);", [String(userId)]);
                const result = await next.handle().toPromise();
                return result;
            });
        })).pipe((0, operators_1.catchError)((error) => {
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.UserContextInterceptor = UserContextInterceptor;
exports.UserContextInterceptor = UserContextInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserContextInterceptor);
//# sourceMappingURL=user-context.interceptor.js.map