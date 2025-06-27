"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLancamentoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lancamento_dto_1 = require("./create-lancamento.dto");
class UpdateLancamentoDto extends (0, mapped_types_1.PartialType)(create_lancamento_dto_1.CreateLancamentoDto) {
}
exports.UpdateLancamentoDto = UpdateLancamentoDto;
//# sourceMappingURL=update-lancamento.dto.js.map