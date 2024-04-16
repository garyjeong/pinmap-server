import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumn1712999147760 implements MigrationInterface {
    name = 'ModifyColumn1712999147760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_31e541c93fdc0bb63cfde6549b7\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_3d29fcc8b18122140372b7c1019\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_f2f498264ba3f4b92b776dc6c16\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`groupId\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`statusId\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`usersId\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`user_id\` int NOT NULL COMMENT '사용자 아이디'`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`group_id\` int NOT NULL COMMENT '그룹 아이디'`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`status_id\` int NOT NULL COMMENT '상태 아이디'`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_7ded8f984bbc2ee6ff0beee491b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_bb9982562cca83afb76c0ddc0d6\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_3220317d774d504d2873856c1c7\` FOREIGN KEY (\`status_id\`) REFERENCES \`user_group_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_3220317d774d504d2873856c1c7\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_bb9982562cca83afb76c0ddc0d6\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP FOREIGN KEY \`FK_7ded8f984bbc2ee6ff0beee491b\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`status_id\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`group_id\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`usersId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`statusId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_f2f498264ba3f4b92b776dc6c16\` FOREIGN KEY (\`statusId\`) REFERENCES \`user_group_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_3d29fcc8b18122140372b7c1019\` FOREIGN KEY (\`usersId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD CONSTRAINT \`FK_31e541c93fdc0bb63cfde6549b7\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
