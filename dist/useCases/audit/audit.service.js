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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_entity_1 = require("./entitiy/audit.entity");
let AuditService = class AuditService {
    constructor(auditRepository) {
        this.auditRepository = auditRepository;
    }
    async findAll(query) {
        const { page, limit, ...rawFilters } = query || {};
        const parsedPage = this.parsePositiveInt(page, 1, 'page');
        const parsedLimit = this.parsePositiveInt(limit, 10, 'limit');
        const queryBuilder = this.auditRepository.createQueryBuilder('audit');
        const validColumns = new Set(this.auditRepository.metadata.columns.map((column) => column.propertyName));
        for (const [rawKey, rawValue] of Object.entries(rawFilters)) {
            if (rawValue === undefined || rawValue === null || rawValue === '') {
                continue;
            }
            const key = rawKey === 'entity' ? 'entityName' : rawKey;
            if (!validColumns.has(key)) {
                continue;
            }
            queryBuilder.andWhere(`audit.${key} = :${key}`, { [key]: rawValue });
        }
        queryBuilder
            .orderBy('audit.createdAt', 'DESC')
            .skip((parsedPage - 1) * parsedLimit)
            .take(parsedLimit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: {
                page: parsedPage,
                limit: parsedLimit,
                total,
                totalPages: Math.ceil(total / parsedLimit),
            },
        };
    }
    async getAuditedEntities() {
        const entities = await this.auditRepository
            .createQueryBuilder('audit')
            .select('DISTINCT audit.entityName', 'entityName')
            .orderBy('audit.entityName', 'ASC')
            .getRawMany();
        return {
            data: entities.map((e) => e.entityName),
            total: entities.length,
        };
    }
    async findById(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new common_1.BadRequestException('ID de auditoria inválido');
        }
        const audit = await this.auditRepository.findOneBy({ id });
        if (!audit) {
            throw new common_1.NotFoundException('Registro de auditoria não encontrado');
        }
        return audit;
    }
    parsePositiveInt(value, defaultValue, fieldName) {
        if (value === undefined || value === null || value === '') {
            return defaultValue;
        }
        const parsedValue = typeof value === 'number' ? value : Number.parseInt(value, 10);
        if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
            throw new common_1.BadRequestException(`Parâmetro ${fieldName} deve ser um número inteiro positivo`);
        }
        return parsedValue;
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_entity_1.Audit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditService);
//# sourceMappingURL=audit.service.js.map