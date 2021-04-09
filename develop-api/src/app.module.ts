import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';

import { Item } from './model/item.entity';
import { Reservation } from './model/reservation.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([Item, Reservation])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
