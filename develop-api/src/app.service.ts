import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHotelFloorRooms(floor: string): string {
        return `Hello Floor! ${ floor }`;
    }
    getHotelFloorRoom(floor: string, room: string): string {
        return `Hello Room! ${ floor }: ${ room }`;
    }
    getHotelFloors(): string {
        return `Hello Hotel!`;
    }
}
