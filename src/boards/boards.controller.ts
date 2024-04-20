import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { CreateBoardDto } from './boards.dto';
import { BoardStatus } from './board.type';
import { BoardStatusValidationPipes } from './boards.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // @Get('/')
  // findAllBoards(): Board[] {
  //   return this.boardsService.findAllBoards();
  // }

  @Get('/')
  findAllBoards(): Promise<Board[]> {
    return this.boardsService.findAllBoards();
  }

  // @Get('/:id')
  // findOneBoard(@Param('id') id: string): Board {
  //   return this.boardsService.findBoardById(id);
  // }

  @Get('/:id')
  findBoardByid(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.findOneById(id);
  }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Patch('/:id/status')
  // updateBoard(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipes) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipes) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): string {
  //   return this.boardsService.deleteBoard(id);
  // }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.boardsService.deleteBoard(id);
  }
}
