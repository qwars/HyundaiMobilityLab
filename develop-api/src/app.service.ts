import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './model/item.entity';

@Injectable()
export class AppService {
    
    constructor(
        @InjectRepository(Item) private readonly repository: Repository<Item>,
    ) { }

    public async getDataState( state = {} ) {
        return await this.repository.find({
            where: state,
            order: { lastChangedDateTime: "DESC" }
        }).then( response => JSON.stringify( response ) );
    }

    public async getHotelFloorRoom( floor: string, room: string ) {
        return await this.getDataState({ id: room, pid: floor });
    }
    
    public async getHotelFloorRooms( floor: string ) {
        return await this.getDataState({ pid: floor });
    }
            
    public async getHotelFloors() {
        return await this.getDataState({ pid: '' });
    }

    public async reservationHotelFloorRoom( uuid: string ) {
        return await this.repository.findOne(uuid)
            .then( response => console.log( response ) )
    }
    
    public async updateHotelFloorRoom( data: Item, uuid: string ) {
        return await this.repository.update({ id: uuid }, data )
            .then( response => response.affected )
    }
    
    public async createHotelFloorRoom( data: Item ) {
        return await this.repository.insert( data )
            .then( response => JSON.stringify( response.identifiers[0] )  )
    }
    
    public async deleteHotelFloorRoom( uuid: string ) {
        return await this.repository.delete( uuid )
            .then( response => response.affected  )        
    }
    
    getAdminState() {
        return `Hello Admin!`;
    }
}
