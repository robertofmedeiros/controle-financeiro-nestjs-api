import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
export declare class LancamentosController {
    private readonly lancamentosService;
    constructor(lancamentosService: LancamentosService);
    create(createLancamentoDto: CreateLancamentoDto, usuario: any): Promise<CreateLancamentoDto & import("./entities/lancamentos.entity").Lancamentos>;
    findAll(query: any): Promise<import("./entities/lancamentos.entity").Lancamentos[]>;
    findOne(id: number): Promise<import("./entities/lancamentos.entity").Lancamentos>;
    update(id: number, updateLancamentoDto: UpdateLancamentoDto): Promise<import("./entities/lancamentos.entity").Lancamentos>;
    remove(id: number): Promise<import("./entities/lancamentos.entity").Lancamentos>;
}
