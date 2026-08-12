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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_context_storage_1 = require("../../useCases/auth/user-context.storage");
let TransactionService = class TransactionService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async beginTransaction() {
        const store = user_context_storage_1.userContextStorage.getStore();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        console.log(">>>", store);
        if (store?.userId) {
            try {
                await queryRunner.query("SELECT set_config('app.current_user_id', $1, true);", [store.userId]);
            }
            catch {
            }
        }
        return queryRunner;
    }
    async commitTransaction(queryRunner) {
        try {
            await queryRunner.commitTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async rollbackTransaction(queryRunner) {
        try {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map