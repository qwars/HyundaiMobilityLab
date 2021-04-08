import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':floor?/:room?')
    getHotelFloorsRooms(@Param('floor',) floor: string, @Param('room',) room: string): string {
        if ( floor ) {
            return this.appService.getHotelFloorRooms( floor );
        }
        else if ( room ) {
            return this.appService.getHotelFloorRoom( floor, room );
        }
        return this.appService.getHotelFloors();
  }
}
