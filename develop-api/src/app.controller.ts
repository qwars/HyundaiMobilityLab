import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('rest-api/:floor?/:room?')
  public async getHotelFloorsRooms(@Param('floor',) floor: string, @Param('room',) room: string) {
        if ( room ) {
            return this.appService.getHotelFloorRoom( floor, room );
        }
        else if ( floor ) {
            return this.appService.getHotelFloorRooms( floor );
        }
        return this.appService.getHotelFloors();
  }
    
  @Get(':floor?/:room?')
    getAdminState(): string {
        return this.appService.getAdminState();
  }
}
