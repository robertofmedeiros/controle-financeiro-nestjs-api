export declare class Audit {
    id: number;
    entityName: string;
    entityId: string;
    userId: number;
    oldState: Record<string, any> | null;
    newState: Record<string, any> | null;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    createdAt: Date;
}
