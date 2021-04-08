import {MigrationInterface, QueryRunner} from "typeorm";

export class dbinit1617861996216 implements MigrationInterface {
    name = 'dbinit1617861996216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_11f1eed2c6d27afbd80731c9d2"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "pid"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "pid" character varying(300)`);
        await queryRunner.query(`CREATE INDEX "IDX_11f1eed2c6d27afbd80731c9d2" ON "hotels" ("pid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_11f1eed2c6d27afbd80731c9d2"`);
        await queryRunner.query(`ALTER TABLE "hotels" DROP COLUMN "pid"`);
        await queryRunner.query(`ALTER TABLE "hotels" ADD "pid" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_11f1eed2c6d27afbd80731c9d2" ON "hotels" ("pid") `);
    }

}
