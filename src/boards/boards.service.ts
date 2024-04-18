import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './boards.dto';

import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  private boards: Board[] = [];

  findAllBoards(): Board[] {
    return this.boards;
  }

  findBoardById(boardId: string): Board {
    const targetBoard = this.boards.find((board) => board.id === boardId);

    if (!targetBoard) {
      throw new NotFoundException(`Can't find Board with id ${boardId}`);
    }

    return targetBoard;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const status: BoardStatus = 'PUBLIC';

    const board: Board = {
      id: uuid(),
      title,
      description,
      status,
    };
    this.boards.push(board);

    return board;
  }

  updateBoardStatus(boardId: string, status: BoardStatus): Board {
    const targetBoard = this.findBoardById(boardId);
    targetBoard.status = status;

    return targetBoard;
  }

  deleteBoard(boardId: string): string {
    const targetBoard = this.findBoardById(boardId); // 이미 에러 처리가 되어있음

    this.boards = this.boards.filter((board) => board.id !== targetBoard.id);

    return boardId;
  }
}
