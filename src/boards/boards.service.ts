import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './boards.dto';

import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  findAllBoards(): Board[] {
    return this.boards;
  }

  findBoardById(boardId: string): Board {
    return this.boards.find((board) => board.id === boardId);
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
    this.boards = this.boards.filter((board) => {
      return board.id !== boardId;
    });

    return boardId;
  }
}
