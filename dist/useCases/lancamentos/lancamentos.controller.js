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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentosController = void 0;
const common_1 = require("@nestjs/common");
const lancamentos_service_1 = require("./lancamentos.service");
const create_lancamento_dto_1 = require("./dto/create-lancamento.dto");
const update_lancamento_dto_1 = require("./dto/update-lancamento.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
let LancamentosController = class LancamentosController {
    constructor(lancamentosService) {
        this.lancamentosService = lancamentosService;
    }
    create(createLancamentoDto, usuario) {
        console.log('>>>', usuario);
        return this.lancamentosService.create(createLancamentoDto);
    }
    findAll(query) {
        return this.lancamentosService.findAll(query);
    }
    findOne(id) {
        return this.lancamentosService.findById(id);
    }
    update(id, updateLancamentoDto) {
        return this.lancamentosService.update(id, updateLancamentoDto);
    }
    remove(id) {
        return this.lancamentosService.remove(id);
    }
};
exports.LancamentosController = LancamentosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.UserContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lancamento_dto_1.CreateLancamentoDto, Object]),
    __metadata("design:returntype", void 0)
], LancamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LancamentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LancamentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lancamento_dto_1.UpdateLancamentoDto]),
    __metadata("design:returntype", void 0)
], LancamentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LancamentosController.prototype, "remove", null);
exports.LancamentosController = LancamentosController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('lancamentos'),
    __metadata("design:paramtypes", [lancamentos_service_1.LancamentosService])
], LancamentosController);
//# sourceMappingURL=lancamentos.controller.js.map