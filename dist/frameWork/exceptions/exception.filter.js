"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = this.getStatus(exception);
        const message = this.getMessage(exception);
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
    getStatus(exception) {
        if (exception instanceof common_1.HttpException) {
            return exception.getStatus();
        }
        if (exception instanceof typeorm_1.QueryFailedError) {
            return common_1.HttpStatus.BAD_REQUEST;
        }
        return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    getMessage(exception) {
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                return exceptionResponse;
            }
            return (exceptionResponse.message ||
                'Erro inesperado');
        }
        if (exception instanceof typeorm_1.QueryFailedError) {
            const driverError = exception.driverError;
            if (driverError?.code === '23502') {
                const dbMessage = driverError.message?.trim();
                return dbMessage || 'Campos obrigatórios não informados';
            }
            if (driverError?.detail) {
                return driverError.detail;
            }
            if (driverError?.message) {
                return driverError.message;
            }
        }
        if (exception instanceof Error) {
            return exception.message;
        }
        return 'Internal server error';
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map