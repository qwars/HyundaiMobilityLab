import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Item } from './model/item.entity';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

    asUUID( path: string = '' ){ return path.replace(/[^A-Z0-9-]/ig, ''); }
    
  @Get('rest-api/:floor?/:room?')
    @ApiOperation({ summary: 'Get data rooms or floors in the hotel' })
    @ApiParam({
        name: 'floor',
        required: false,
        type: String
    })
    @ApiParam({
        name: 'room',
        required: false,
        type: String
    })
    public async getHotelFloorsRooms(
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        if ( this.asUUID( room ) ) {
            return this.appService.getHotelFloorRoom( this.asUUID( floor ), this.asUUID( room ) );
        }
        else if ( this.asUUID( floor ) ) {
            return this.appService.getHotelFloorRooms( this.asUUID( floor ) );
        }
        return this.appService.getHotelFloors();
  }

  @Post('rest-api/:floor/:room?')
    @ApiOperation({ summary: 'Update room or floor in the hotel' })
    @ApiParam({
        name: 'floor',
        required: true,
        type: String
    })
    @ApiParam({
        name: 'room',
        required: false,
        type: String
    })
    public async updateHotelFloorsRooms(
        @Body() postData: Item,
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.updateHotelFloorRoom( postData,  this.asUUID( room ) || this.asUUID( floor ) );
    }

  @Put('rest-api/:floor')
    @ApiOperation({ summary: 'Create room for floor in the hotel' })
    @ApiParam({
        name: 'floor',
        required: false,
        type: String
    })
    public async createHotelFloorsRooms(
        @Body() postData: Item,
        @Param('floor') floor: string
    ) {
        return this.appService.createHotelFloorRoom({ ...postData, pid: this.asUUID( floor ) });
    }


  @Delete('rest-api/:floor/:room?')
    @ApiOperation({ summary: 'Delete room or floor in the hotel' })
    @ApiParam({
        name: 'floor',
        required: true,
        type: String
    })
    @ApiParam({
        name: 'room',
        required: false,
        type: String
    })
    public async deleteHotelFloorsRooms(
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.deleteHotelFloorRoom( this.asUUID( room ) || this.asUUID( floor ) );
    }


    @Post('rest-api/reservation/:id')
    @ApiOperation({ summary: 'Reservation room or floor in the hotel' })
    @ApiParam({
        name: 'id',
        required: true,
        type: String
    })
    public async reservationHotelFloorsRooms(
        @Param('id') uuid: string
    ) {
        return this.appService.reservationHotelFloorRoom( uuid );
    }

  @Get(':floor?/:room?')
    @ApiOperation({ summary: 'Administrative subsection' })
    getAdminState(): string {
        return this.appService.getAdminState();
    }
}
