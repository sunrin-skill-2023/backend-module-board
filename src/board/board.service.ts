import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'shared/src/entities/board.entity';
import {
  BoardList,
  IBoard,
  ICreateBoard,
  IDeleteBoard,
  IGetBoardById,
  IIsBoardOwner,
  IUpdateBoard,
} from 'shared/src/generated/board.proto';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async getBoardList(): Promise<BoardList> {
    const res = await this.boardRepository.find();

    return {
      boards: res,
    };
  }

  async createBoard(data: ICreateBoard): Promise<IBoard> {
    const res = await this.boardRepository.save({
      title: data.title,
      content: data.content,
      user: {
        uuid: data.userId,
      },
    });

    return res;
  }

  async deleteBoard(data: IDeleteBoard) {
    return await this.boardRepository.delete(data.id);
  }

  async updateBoard(data: IUpdateBoard): Promise<IBoard> {
    const res = await this.boardRepository.update(data.id, {
      title: data.title,
      content: data.content,
    });

    return res.raw;
  }

  async isBoardOwner(data: IIsBoardOwner) {
    const res = await this.boardRepository.findOne({
      where: {
        id: data.boardId,
      },
    });

    return { isOwner: res.user.uuid === data.userId };
  }

  async getBoardById(data: IGetBoardById): Promise<IBoard> {
    const res = await this.boardRepository.findOne({
      where: {
        id: data.id,
      },
    });

    return res;
  }
}
