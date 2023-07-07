import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcClientOptions } from 'shared/src/options/board.option';
import { DatabaseModule } from './database.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    GrpcReflectionModule.register(grpcClientOptions),
    DatabaseModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
