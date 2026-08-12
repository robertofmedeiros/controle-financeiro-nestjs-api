import { DataSource, QueryRunner } from 'typeorm';
export declare class TransactionService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    beginTransaction(): Promise<QueryRunner>;
    commitTransaction(queryRunner: QueryRunner): Promise<void>;
    rollbackTransaction(queryRunner: QueryRunner): Promise<void>;
}
