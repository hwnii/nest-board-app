import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './boards.dto';
import { BoardStatusValidationPipes } from './boards.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  findAllBoards(): Board[] {
    return this.boardsService.findAllBoards();
  }

  @Get('/:id')
  findOneBoard(@Param('id') id: string): Board {
    return this.boardsService.findBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipes) status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): string {
    return this.boardsService.deleteBoard(id);
  }
}
