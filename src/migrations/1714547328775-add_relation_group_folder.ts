import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationGroupFolder1714547328775 implements MigrationInterface {
    name = 'AddRelationGroupFolder1714547328775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`image_date\` \`image_data\` datetime NOT NULL COMMENT '이미지 생성 일자'`);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD \`group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD CONSTRAINT \`FK_c6d723b923923f7e333f510b889\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folder\` DROP FOREIGN KEY \`FK_c6d723b923923f7e333f510b889\``);
        await queryRunner.query(`ALTER TABLE \`folder\` DROP COLUMN \`group_id\``);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`image_data\` \`image_date\` datetime NOT NULL COMMENT '이미지 생성 일자'`);
    }

}
