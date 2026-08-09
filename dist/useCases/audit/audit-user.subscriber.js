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
exports.AuditUserSubscriber = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_context_storage_1 = require("../auth/user-context.storage");
let AuditUserSubscriber = class AuditUserSubscriber {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.dataSource.subscribers.push(this);
    }
    async beforeTransactionStart(event) {
        const store = user_context_storage_1.userContextStorage.getStore();
        if (store?.userId) {
            try {
                const currentValue = await event.queryRunner.query("SELECT current_setting('app.current_user_id', true);");
                if (!currentValue || currentValue[0]?.current_setting === '') {
                    await event.queryRunner.query("SELECT set_config('app.current_user_id', $1, true);", [store.userId]);
                }
            }
            catch {
            }
        }
    }
    listenTo() {
        return Object;
    }
};
exports.AuditUserSubscriber = AuditUserSubscriber;
exports.AuditUserSubscriber = AuditUserSubscriber = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AuditUserSubscriber);
//# sourceMappingURL=audit-user.subscriber.js.map