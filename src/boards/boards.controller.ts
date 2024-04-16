import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  findAllBoards(): Board[] {
    return this.boardsService.findAllBoards();
  }

  @Get('/:id')
  findOneBoard(@Param('id') id: string): Board {
    return this.boardsService.findOneBoard(id);
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): string {
    return this.boardsService.deleteBoard(id);
  }
}
