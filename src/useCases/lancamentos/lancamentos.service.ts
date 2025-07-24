import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lancamentos } from './entities/lancamentos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LancamentosService {
  constructor(
    @InjectRepository(Lancamentos)
    private lancamentosRepository: Repository<Lancamentos>,
  ) {}

  create(createLancamentoDto: CreateLancamentoDto) {
    return this.lancamentosRepository.save(createLancamentoDto);
  }

  findAll(query: any) {
    return this.lancamentosRepository.find({
      where: query,
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number) {
    const lancamentoResult = await this.lancamentosRepository.findOneBy({
      id,
    });

    if (!lancamentoResult) {
      throw new BadRequestException('Lançamento não encontrado');
    }

    return lancamentoResult;
  }

  async update(id: number, updateLancamentoDto: UpdateLancamentoDto) {
    const lancamentoResult = await this.findById(id);
    if (!lancamentoResult) {
      throw new BadRequestException('Cliente não encontrado');
    }

    lancamentoResult.id = id;

    await this.lancamentosRepository
      .createQueryBuilder()
      .update(Lancamentos)
      .set(updateLancamentoDto)
      .where('id = :id', { id })
      .execute();
    return await this.findById(id);
  }

  async remove(id: number) {
    const lancamentoResult = await this.findById(id);
    if (!lancamentoResult) {
      throw new BadRequestException('Lançamento não encontrado');
    }

    return lancamentoResult;
  }
}
