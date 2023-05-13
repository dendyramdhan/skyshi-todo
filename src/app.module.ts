import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { TodoModule } from './todo/todo.module';
import { ActivityModule } from './activity/activity.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    TodoModule,
    ActivityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
