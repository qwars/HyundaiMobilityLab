import {MigrationInterface, QueryRunner} from "typeorm";

export class dbinit1617893845842 implements MigrationInterface {
    name = 'dbinit1617893845842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hotels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pid" character varying(300) NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "internalComment" character varying(300), "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL DEFAULT '', "isBooked" smallint NOT NULL DEFAULT '0', "attributes" json NOT NULL DEFAULT '{}', CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11f1eed2c6d27afbd80731c9d2" ON "hotels" ("pid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_11f1eed2c6d27afbd80731c9d2"`);
        await queryRunner.query(`DROP TABLE "hotels"`);
    }

}
