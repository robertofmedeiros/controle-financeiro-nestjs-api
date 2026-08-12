import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { Lancamentos } from './entities/lancamentos.entity';
import { Repository } from 'typeorm';
import { TransactionService } from '../../frameWork/transaction/transaction.service';
export declare class LancamentosService {
    private lancamentosRepository;
    private readonly transactionService;
    constructor(lancamentosRepository: Repository<Lancamentos>, transactionService: TransactionService);
    create(createLancamentoDto: CreateLancamentoDto): Promise<CreateLancamentoDto & Lancamentos>;
    findAll(query: any): Promise<Lancamentos[]>;
    findById(id: number): Promise<Lancamentos>;
    update(id: number, updateLancamentoDto: UpdateLancamentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Lancamentos>;
}
