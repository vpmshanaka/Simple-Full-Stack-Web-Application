import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainController } from './main/main.controller';
import { UserController } from './user/user.controller';
import { PageController } from './page/page.controller';
import { PageService } from './page/page.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity'; // Import User entity
import { Page } from './page/page.entity'; // Import Page entity
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:   [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@Saberion123',
      database: 'nest_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
   TypeOrmModule.forFeature([User, Page]),
    // ... other modules
  ],
  controllers: [MainController, UserController, PageController],
  providers: [UserService, PageService],
})
export class AppModule {}
