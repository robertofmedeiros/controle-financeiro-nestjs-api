import { EntitySubscriberInterface, DataSource, TransactionStartEvent } from "typeorm";
export declare class AuditUserSubscriber implements EntitySubscriberInterface {
    private dataSource;
    constructor(dataSource: DataSource);
    beforeTransactionStart(event: TransactionStartEvent): Promise<void>;
    listenTo(): ObjectConstructor;
}
