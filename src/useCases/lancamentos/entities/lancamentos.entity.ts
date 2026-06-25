import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lancamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  mes: number;

  @Column()
  ano: number;

  @Column({ type: 'double precision' })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  situacao: 'PENDENTE' | 'PAGO';
}
