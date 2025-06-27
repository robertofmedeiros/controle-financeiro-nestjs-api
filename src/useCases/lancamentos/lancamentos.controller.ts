import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('lancamentos')
export class LancamentosController {
  constructor(private readonly lancamentosService: LancamentosService) {}

  @Post()
  create(@Body() createLancamentoDto: CreateLancamentoDto) {
    return this.lancamentosService.create(createLancamentoDto);
  }

  @Get()
  findAll() {
    return this.lancamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lancamentosService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateLancamentoDto: UpdateLancamentoDto,
  ) {
    return this.lancamentosService.update(id, updateLancamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lancamentosService.remove(id);
  }
}
