import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(query: any): Promise<{
        data: import("./entitiy/audit.entity").Audit[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getAuditedEntities(): Promise<{
        data: any[];
        total: number;
    }>;
    findById(id: number): Promise<import("./entitiy/audit.entity").Audit>;
}
