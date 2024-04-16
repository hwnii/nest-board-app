import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './boards.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  findAllBoards(): Board[] {
    return this.boards;
  }

  findOneBoard(boardId: string): Board {
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
}
