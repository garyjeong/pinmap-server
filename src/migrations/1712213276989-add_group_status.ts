import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupStatus1712213276989 implements MigrationInterface {
    name = 'AddGroupStatus1712213276989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_group_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status_name\` varchar(100) NOT NULL COMMENT '그룹 참여 상태명', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="사용자 그룹 참여에 대한 상태 테이블"`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`is_owner\` tinyint NOT NULL COMMENT '그룹장 여부'`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`status_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_3220317d774d504d2873856c1c7\` FOREIGN KEY (\`status_id\`) REFERENCES \`user_group_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_3220317d774d504d2873856c1c7\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`status_id\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`is_owner\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`DROP TABLE \`user_group_status\``);
    }

}
