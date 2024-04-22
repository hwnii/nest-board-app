import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { CreateBoardDto } from './boards.dto';
import { BoardStatus } from './board.type';
import { BoardStatusValidationPipes } from './boards.pipe';
import { AuthGuard } from '@nestjs/passport';
import { DUser } from 'src/decorators/user.decorator';
import { User } from 'src/auth/users/users.entity';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // @Get('/')
  // findAllBoards(): Board[] {
  //   return this.boardsService.findAllBoards();
  // }

  // @Get('/:id')
  // findOneBoard(@Param('id') id: string): Board {
  //   return this.boardsService.findBoardById(id);
  // }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // @Patch('/:id/status')
  // updateBoard(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipes) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): string {
  //   return this.boardsService.deleteBoard(id);
  // }

  @Get('/')
  findAllBoards(@DUser() user: User): Promise<Board[]> {
    return this.boardsService.findAllBoards(user);
  }

  @Get('/:id')
  findBoardByid(
    @DUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Board> {
    return this.boardsService.findOneById(id, user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @DUser() user: User,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Patch('/:id/status')
  updateBoard(
    @DUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipes) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status, user);
  }

  @Delete('/:id')
  deleteBoard(
    @DUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
}
