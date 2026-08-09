/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { Injectable } from "@nestjs/common";
import { EntitySubscriberInterface, DataSource, EventSubscriber, TransactionStartEvent } from "typeorm";
import { userContextStorage } from "../auth/user-context.storage";

@Injectable()
@EventSubscriber()
export class AuditUserSubscriber implements EntitySubscriberInterface {
  constructor(private dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  async beforeTransactionStart(event: TransactionStartEvent): Promise<void> {
    const store = userContextStorage.getStore();
    if (store?.userId) {
      try {
        // Verifica se a variável já está setada
        const currentValue = await event.queryRunner.query(
          "SELECT current_setting('app.current_user_id', true);"
        );
        
        // Se não estiver setada, seta agora (para transações explícitas no código)
        if (!currentValue || currentValue[0]?.current_setting === '') {
          await event.queryRunner.query(
            "SELECT set_config('app.current_user_id', $1, true);",
            [store.userId]
          );
        }
      } catch {
        // Ignora silenciosamente se falhar
      }
    }
  }
    

  listenTo() {
    return Object;
  }

}