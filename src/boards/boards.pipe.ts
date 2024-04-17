import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from './board.model';

export class BoardStatusValidationPipes implements PipeTransform {
  private readonly StatusOptions: BoardStatus[] = ['PUBLIC', 'PRIVATE'];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isValidStatus(status: 'PUBLIC' | 'PRIVATE') {
    const index = this.StatusOptions.indexOf(status);

    return index !== -1;
  }
}
