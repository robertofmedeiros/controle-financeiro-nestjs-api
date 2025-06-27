"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentosModule = void 0;
const common_1 = require("@nestjs/common");
const lancamentos_service_1 = require("./lancamentos.service");
const lancamentos_controller_1 = require("./lancamentos.controller");
const lancamentos_entity_1 = require("./entities/lancamentos.entity");
const typeorm_1 = require("@nestjs/typeorm");
let LancamentosModule = class LancamentosModule {
};
exports.LancamentosModule = LancamentosModule;
exports.LancamentosModule = LancamentosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lancamentos_entity_1.Lancamentos])],
        controllers: [lancamentos_controller_1.LancamentosController],
        providers: [lancamentos_service_1.LancamentosService],
        exports: [lancamentos_service_1.LancamentosService],
    })
], LancamentosModule);
//# sourceMappingURL=lancamentos.module.js.map