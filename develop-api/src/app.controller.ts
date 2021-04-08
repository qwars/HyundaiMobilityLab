import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('rest-api/:floor?/:room?')
  public async getHotelFloorsRooms(@Param('floor') floor: string, @Param('room') room: string) {
        if ( room ) {
            return this.appService.getHotelFloorRoom( floor, room );
        }
        else if ( floor ) {
            return this.appService.getHotelFloorRooms( floor );
        }
        return this.appService.getHotelFloors();
  }

  @Post('rest-api/:floor?/:room?')
    public async updateHotelFloorsRooms(
        @Body() postData: any,
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.updateHotelFloorRoom( postData, floor, room );
    }

  @Put('rest-api/:floor')
    public async createHotelFloorsRooms(
        @Body() postData: any,
        @Param('floor') floor: string
    ) {
        return this.appService.createHotelFloorRoom( postData, floor );
    }


  @Delete('rest-api/:floor?/:room?')
    public async deleteHotelFloorsRooms(
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.deleteHotelFloorRoom( floor, room );
    }

    
  @Get(':floor?/:room?')
  getAdminState(): string {
     return this.appService.getAdminState();
  }
    
    
}
