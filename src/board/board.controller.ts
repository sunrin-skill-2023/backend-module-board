import { Controller, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { BoardEntity } from 'shared/src/entities/board.entity';
import {
  BoardList,
  BoardServiceController,
  BoardServiceControllerMethods,
  IBoard,
  ICreateBoard,
  IDeleteBoard,
  IGetBoardById,
  IIsBoardOwner,
  IIsBoardOwnerResponse,
  IUpdateBoard,
} from 'shared/src/generated/board.proto';
import { BoardService } from './board.service';

@Controller('board')
@BoardServiceControllerMethods()
export class BoardController implements BoardServiceController, OnModuleInit {
  constructor(private readonly BoardService: BoardService) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onModuleInit() {}

  getBoardById(request: IGetBoardById): Promise<IBoard> {
    return this.BoardService.getBoardById(request);
  }

  async getBoardList(): Promise<BoardList> {
    return await this.BoardService.getBoardList();
  }

  isBoardOwner(request: IIsBoardOwner): Promise<IIsBoardOwnerResponse> {
    return this.BoardService.isBoardOwner(request);
  }

  async createBoard(request: ICreateBoard): Promise<IBoard> {
    return await this.BoardService.createBoard(request);
  }

  async deleteBoard(request: IDeleteBoard) {
    return await this.BoardService.deleteBoard(request);
  }

  async updateBoard(request: IUpdateBoard): Promise<IBoard> {
    return await this.BoardService.updateBoard(request);
  }
}
