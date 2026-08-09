import { AsyncLocalStorage } from "async_hooks";
export declare const userContextStorage: AsyncLocalStorage<{
    userId: string | null;
}>;
