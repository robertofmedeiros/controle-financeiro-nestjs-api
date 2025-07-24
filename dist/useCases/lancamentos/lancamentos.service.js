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
exports.LancamentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lancamentos_entity_1 = require("./entities/lancamentos.entity");
const typeorm_2 = require("typeorm");
let LancamentosService = class LancamentosService {
    constructor(lancamentosRepository) {
        this.lancamentosRepository = lancamentosRepository;
    }
    create(createLancamentoDto) {
        return this.lancamentosRepository.save(createLancamentoDto);
    }
    findAll(query) {
        return this.lancamentosRepository.find({
            where: query,
            order: {
                id: 'ASC',
            },
        });
    }
    async findById(id) {
        const lancamentoResult = await this.lancamentosRepository.findOneBy({
            id,
        });
        if (!lancamentoResult) {
            throw new common_1.BadRequestException('Lançamento não encontrado');
        }
        return lancamentoResult;
    }
    async update(id, updateLancamentoDto) {
        const lancamentoResult = await this.findById(id);
        if (!lancamentoResult) {
            throw new common_1.BadRequestException('Cliente não encontrado');
        }
        lancamentoResult.id = id;
        await this.lancamentosRepository
            .createQueryBuilder()
            .update(lancamentos_entity_1.Lancamentos)
            .set(updateLancamentoDto)
            .where('id = :id', { id })
            .execute();
        return await this.findById(id);
    }
    async remove(id) {
        const lancamentoResult = await this.findById(id);
        if (!lancamentoResult) {
            throw new common_1.BadRequestException('Lançamento não encontrado');
        }
        return lancamentoResult;
    }
};
exports.LancamentosService = LancamentosService;
exports.LancamentosService = LancamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lancamentos_entity_1.Lancamentos)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LancamentosService);
//# sourceMappingURL=lancamentos.service.js.map