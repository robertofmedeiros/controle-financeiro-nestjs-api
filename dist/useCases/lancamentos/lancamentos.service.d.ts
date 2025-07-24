import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { Lancamentos } from './entities/lancamentos.entity';
import { Repository } from 'typeorm';
export declare class LancamentosService {
    private lancamentosRepository;
    constructor(lancamentosRepository: Repository<Lancamentos>);
    create(createLancamentoDto: CreateLancamentoDto): Promise<CreateLancamentoDto & Lancamentos>;
    findAll(query: any): Promise<Lancamentos[]>;
    findById(id: number): Promise<Lancamentos>;
    update(id: number, updateLancamentoDto: UpdateLancamentoDto): Promise<Lancamentos>;
    remove(id: number): Promise<Lancamentos>;
}
