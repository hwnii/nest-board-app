import { CreateBoardDto } from './boards.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './boards.entity';
import { BoardStatus } from './board.type';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  // findAllBoards(): Board[] {
  //   return this.boards;
  // }

  // findBoardById(boardId: string): Board {
  //   const targetBoard = this.boards.find((board) => board.id === boardId);

  //   if (!targetBoard) {
  //     throw new NotFoundException(`Can't find Board with id ${boardId}`);
  //   }

  //   return targetBoard;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const status: BoardStatus = 'PUBLIC';

  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status,
  //   };
  //   this.boards.push(board);

  //   return board;
  // }

  // updateBoardStatus(boardId: string, status: BoardStatus): Board {
  //   const targetBoard = this.findBoardById(boardId);
  //   targetBoard.status = status;

  //   return targetBoard;
  // }

  // deleteBoard(boardId: string): string {
  //   const targetBoard = this.findBoardById(boardId); // 이미 에러 처리가 되어있음

  //   this.boards = this.boards.filter((board) => board.id !== targetBoard.id);

  //   return boardId;
  // }

  async findAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async findOneById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't found board id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const status: BoardStatus = 'PUBLIC';

    const board = {
      title,
      description,
      status,
    };

    return await this.boardRepository.save(board);
  }

  async updateBoardStatus(
    boardId: number,
    status: BoardStatus,
  ): Promise<Board> {
    const targetBoard = await this.findOneById(boardId);

    targetBoard.status = status;

    return this.boardRepository.save(targetBoard);
  }

  async deleteBoard(boardId: number): Promise<void> {
    const result = await this.boardRepository.delete(boardId);

    if (result.affected) {
      throw new NotFoundException(`Can't find Board with id ${boardId}`);
    }

    console.log('result: ', result);
  }
}
