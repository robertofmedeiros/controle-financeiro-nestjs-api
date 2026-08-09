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
var AuditTriggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTriggerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const audit_decorator_1 = require("./audit.decorator");
let AuditTriggerService = AuditTriggerService_1 = class AuditTriggerService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(AuditTriggerService_1.name);
        this.TRIGGER_PREFIX = 'trg_audit_';
    }
    async onModuleInit() {
        try {
            await this.ensureAuditFunctionExists();
            await this.syncDatabaseTriggers();
        }
        catch (error) {
            this.logger.error('Erro ao sincronizar triggers de auditoria', error);
        }
    }
    async ensureAuditFunctionExists() {
        const query = `
      CREATE OR REPLACE FUNCTION fn_audit_trigger_log()
      RETURNS TRIGGER AS $$
      DECLARE
          old_data jsonb := NULL;
          new_data jsonb := NULL;
          entity_id_val text := NULL;
          pk_column text := COALESCE(TG_ARGV[0], 'id');
      BEGIN
          IF (TG_OP = 'INSERT') THEN
              new_data := to_jsonb(NEW);
              entity_id_val := (new_data ->> pk_column);
          ELSIF (TG_OP = 'UPDATE') THEN
              old_data := to_jsonb(OLD);
              new_data := to_jsonb(NEW);
              entity_id_val := (new_data ->> pk_column);
          ELSIF (TG_OP = 'DELETE') THEN
              old_data := to_jsonb(OLD);
              entity_id_val := (old_data ->> pk_column);
          END IF;

          INSERT INTO audit (entity_name, entity_id, user_id, action, old_state, new_state, created_at)
          VALUES (
              TG_TABLE_NAME,
              entity_id_val,
              NULLIF(current_setting('app.current_user_id', true), '')::integer,
              TG_OP,
              old_data,
              new_data,
              NOW()
          );

          RETURN COALESCE(NEW, OLD);
      END;
      $$ LANGUAGE plpgsql;
    `;
        await this.dataSource.query(query);
    }
    async syncDatabaseTriggers() {
        const queryRunner = this.dataSource.createQueryRunner();
        const auditableEntitiesMap = new Map();
        for (const metadata of this.dataSource.entityMetadatas) {
            const isAuditable = Boolean(Reflect.getMetadata(audit_decorator_1.AUDITABLE_KEY, metadata.target));
            if (isAuditable) {
                const pkColumn = metadata.primaryColumns[0]?.databaseName || 'id';
                auditableEntitiesMap.set(metadata.tableName, pkColumn);
            }
        }
        const existingTriggersRaw = await queryRunner.query(`
      SELECT tgname AS trigger_name, relname AS table_name
      FROM pg_trigger
      JOIN pg_class ON pg_trigger.tgrelid = pg_class.oid
      WHERE tgname LIKE '${this.TRIGGER_PREFIX}%';
    `);
        const existingTriggersMap = new Map(existingTriggersRaw.map((t) => [t.table_name, t.trigger_name]));
        for (const [tableName, pkColumn] of auditableEntitiesMap.entries()) {
            const triggerName = `${this.TRIGGER_PREFIX}${tableName}`;
            await queryRunner.query(`
        DROP TRIGGER IF EXISTS ${triggerName} ON "${tableName}";
        CREATE TRIGGER ${triggerName}
        AFTER INSERT OR UPDATE OR DELETE ON "${tableName}"
        FOR EACH ROW
        EXECUTE FUNCTION fn_audit_trigger_log('${pkColumn}');
      `);
            this.logger.log(`Trigger de auditoria garantida para tabela: ${tableName}`);
        }
        for (const [tableName, triggerName] of existingTriggersMap.entries()) {
            if (!auditableEntitiesMap.has(tableName)) {
                await queryRunner.query(`DROP TRIGGER IF EXISTS ${triggerName} ON "${tableName}";`);
                this.logger.warn(`Trigger removida da tabela não-auditável: ${tableName}`);
            }
        }
        await queryRunner.release();
    }
};
exports.AuditTriggerService = AuditTriggerService;
exports.AuditTriggerService = AuditTriggerService = AuditTriggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AuditTriggerService);
//# sourceMappingURL=audit-trigger.service.js.map