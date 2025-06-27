import { CreateLancamentoDto } from './create-lancamento.dto';
declare const UpdateLancamentoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLancamentoDto>>;
export declare class UpdateLancamentoDto extends UpdateLancamentoDto_base {
    id: number;
}
export {};
