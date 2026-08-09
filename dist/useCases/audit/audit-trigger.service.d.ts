import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AuditTriggerService implements OnModuleInit {
    private readonly dataSource;
    private readonly logger;
    private readonly TRIGGER_PREFIX;
    constructor(dataSource: DataSource);
    onModuleInit(): Promise<void>;
    private ensureAuditFunctionExists;
    private syncDatabaseTriggers;
}
