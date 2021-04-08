import {MigrationInterface, QueryRunner} from "typeorm";

export class dbinit1617888988439 implements MigrationInterface {
    name = 'dbinit1617888988439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "name" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotels" ALTER COLUMN "name" SET DEFAULT ''`);
    }

}
