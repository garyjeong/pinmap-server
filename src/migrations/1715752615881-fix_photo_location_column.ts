import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPhotoLocationColumn1715752615881 implements MigrationInterface {
    name = 'FixPhotoLocationColumn1715752615881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`image_location\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`latitude\` decimal(10,7) NULL COMMENT '이미지 위치 정보의 위도'`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`longitude\` decimal(10,7) NULL COMMENT '이미지 위치 정보의 경도'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`image_location\` point NULL COMMENT '이미지 위치 정보'`);
    }

}
