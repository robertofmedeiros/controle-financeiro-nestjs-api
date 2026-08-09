/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { userContextStorage } from "./user-context.storage";
import { DataSource } from "typeorm";

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
    constructor(private readonly dataSource: DataSource) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.userId || request.user?.id || request.headers['user-id'] || request.headers['id'] || request.headers['x-user-id'] || null;
        const method = request.method?.toUpperCase();

        // Métodos que modificam dados (precisam de transação)
        const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        const needsTransaction = writeMethods.includes(method);

        // Se não houver userId, executa normalmente sem transação
        if (!userId) {
            return next.handle();
        }

        // Para SELECTs (GET, HEAD, OPTIONS), não usa transação
        if (!needsTransaction) {
            return next.handle();
        }

        // Para operações de escrita, envolve em transação para garantir isolamento
        return from(
            this.dataSource.transaction(async (manager) => {
                return await userContextStorage.run({ userId }, async () => {
                    // Seta a variável de sessão dentro da transação
                    await manager.query(
                        "SELECT set_config('app.current_user_id', $1, true);",
                        [String(userId)]
                    );

                    // Executa o handler e aguarda o resultado
                    const result = await next.handle().toPromise();
                    return result;
                });
            })
        ).pipe(
            catchError((error) => {
                // Em caso de erro, a transação faz rollback automaticamente
                return throwError(() => error);
            })
        );
    }
}