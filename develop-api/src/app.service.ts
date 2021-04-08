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
    
    public async getHotelFloorRooms(floor: string) {
        return await this.getDataState({ pid: floor });
    }
        
    public async getHotelFloors() {
        return await this.getDataState({ pid: null });
    }

    public async updateHotelFloorRoom( data, floor: string, room: string ) {
        
    }
    
    public async createHotelFloorRoom( data, floor: string ) {
        
    }
    public async deleteHotelFloorRoom( floor: string, room: string ) {
        
    }
    
    getAdminState() {
        return `Hello Admin!`;
    }
}
