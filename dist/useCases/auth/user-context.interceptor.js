"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContextInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const user_context_storage_1 = require("./user-context.storage");
let UserContextInterceptor = class UserContextInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.userId ||
            request.user?.id ||
            request.headers['user-id'] ||
            request.headers['x-user-id'] ||
            null;
        if (!userId) {
            return next.handle();
        }
        return new rxjs_1.Observable((subscriber) => {
            user_context_storage_1.userContextStorage.run({ userId }, () => {
                next.handle().subscribe({
                    next: (val) => subscriber.next(val),
                    error: (err) => subscriber.error(err),
                    complete: () => subscriber.complete(),
                });
            });
        });
    }
};
exports.UserContextInterceptor = UserContextInterceptor;
exports.UserContextInterceptor = UserContextInterceptor = __decorate([
    (0, common_1.Injectable)()
], UserContextInterceptor);
//# sourceMappingURL=user-context.interceptor.js.map