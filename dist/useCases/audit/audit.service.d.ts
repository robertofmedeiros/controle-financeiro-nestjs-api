import { Repository } from 'typeorm';
import { Audit } from './entitiy/audit.entity';
export declare class AuditService {
    private readonly auditRepository;
    constructor(auditRepository: Repository<Audit>);
    findAll(query: any): Promise<{
        data: Audit[];
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
    findById(id: number): Promise<Audit>;
    private parsePositiveInt;
}
